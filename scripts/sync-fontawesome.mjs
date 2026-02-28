#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const styleWhitelist = new Set(['solid', 'regular', 'brands']);

const readJson = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const parseArgs = () => {
  const args = process.argv.slice(2);
  const sourceArg = args.find((item) => item.startsWith('--source='));
  if (!sourceArg) {
    return {};
  }
  return { source: sourceArg.replace('--source=', '') };
};

const resolveSourceRoot = ({ source = '' } = {}) => {
  const candidates = [];

  if (source) {
    candidates.push(path.resolve(process.cwd(), source));
  }

  candidates.push(path.resolve(repoRoot, 'node_modules/@fortawesome/fontawesome-free'));

  for (const candidate of candidates) {
    const iconFamiliesPath = path.join(candidate, 'metadata/icon-families.json');
    const shimsPath = path.join(candidate, 'metadata/shims.yml');

    if (fs.existsSync(iconFamiliesPath) && fs.existsSync(shimsPath)) {
      return candidate;
    }
  }

  throw new Error(
    [
      'Cannot find Font Awesome metadata source.',
      'Install @fortawesome/fontawesome-free or pass --source=<path-to-package-root>.',
      'Expected files:',
      '- metadata/icon-families.json',
      '- metadata/shims.yml'
    ].join('\n')
  );
};

const dedupeStringArray = (list = []) => {
  const unique = [];
  list.forEach((item) => {
    if (typeof item === 'string' && item.length > 0 && !unique.includes(item)) {
      unique.push(item);
    }
  });
  return unique;
};

const buildIconList = (iconFamilies = {}) => {
  const output = [];

  Object.entries(iconFamilies).forEach(([name, item]) => {
    const freeStyles = Array.isArray(item?.familyStylesByLicense?.free)
      ? item.familyStylesByLicense.free
      : [];

    const styles = dedupeStringArray(
      freeStyles
        .filter((styleItem) => styleItem.family === 'classic')
        .map((styleItem) => styleItem.style)
        .filter((style) => styleWhitelist.has(style))
    );

    if (styles.length === 0) {
      return;
    }

    const searchTerms = dedupeStringArray([
      ...(Array.isArray(item?.search?.terms) ? item.search.terms : []),
      ...(Array.isArray(item?.aliases?.names) ? item.aliases.names : [])
    ]);

    output.push({
      name: name,
      search: searchTerms,
      styles: styles,
      label: item?.label || name
    });
  });

  output.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return output;
};

const parseFlatYamlObject = (yamlString = '') => {
  const result = {};
  let currentKey = '';

  yamlString.split('\n').forEach((line) => {
    const normalizedLine = line.replace(/\r$/, '');

    if (!normalizedLine.trim() || normalizedLine.trim().startsWith('#')) {
      return;
    }

    if (!normalizedLine.startsWith('  ') && normalizedLine.endsWith(':')) {
      currentKey = normalizedLine.slice(0, -1).trim();
      result[currentKey] = {};
      return;
    }

    if (!currentKey || !normalizedLine.startsWith('  ')) {
      return;
    }

    const detail = normalizedLine.trim();
    const separatorIndex = detail.indexOf(':');
    if (separatorIndex === -1) {
      return;
    }

    const key = detail.slice(0, separatorIndex).trim();
    let value = detail.slice(separatorIndex + 1).trim();

    if (!value) {
      return;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith('\'') && value.endsWith('\''))
    ) {
      value = value.slice(1, -1);
    }

    result[currentKey][key] = value;
  });

  return result;
};

const buildShimMap = (yamlString = '') => {
  const parsed = parseFlatYamlObject(yamlString);
  const map = {};

  Object.entries(parsed).forEach(([legacyName, entry]) => {
    const mapped = {
      name: entry.name || legacyName
    };

    if (entry.prefix) {
      mapped.prefix = entry.prefix;
    }

    map[legacyName] = mapped;
  });

  return map;
};

const writeJsModule = (filePath, varName, value, imports = []) => {
  const output = [];
  imports.forEach((line) => output.push(line));
  if (imports.length > 0) {
    output.push('');
  }
  output.push(`export const ${varName} = ${JSON.stringify(value, null, 2)};`);
  output.push('');
  fs.writeFileSync(filePath, output.join('\n'));
};

const main = () => {
  const sourceRoot = resolveSourceRoot(parseArgs());

  const iconFamiliesPath = path.join(sourceRoot, 'metadata/icon-families.json');
  const shimsPath = path.join(sourceRoot, 'metadata/shims.yml');

  const iconFamilies = readJson(iconFamiliesPath);
  const iconList = buildIconList(iconFamilies);
  const shimMap = buildShimMap(fs.readFileSync(shimsPath, 'utf8'));

  writeJsModule(
    path.join(repoRoot, 'src/component/fontawesome/index.js'),
    'fontawesome',
    iconList,
    ['import \'./index.css\';']
  );

  writeJsModule(
    path.join(repoRoot, 'src/component/fontawesome/shims.js'),
    'fontawesomeShims',
    shimMap
  );

  console.log(`Generated ${iconList.length} icons and ${Object.keys(shimMap).length} shims.`);
};

main();
