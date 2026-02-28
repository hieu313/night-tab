import { fontawesome } from '../component/fontawesome';
import { fontawesomeShims } from '../component/fontawesome/shims';

const prefixToStyle = {
  fa: 'solid',
  fas: 'solid',
  'fa-solid': 'solid',
  far: 'regular',
  'fa-regular': 'regular',
  fab: 'brands',
  'fa-brands': 'brands'
};

const styleToPrefix = {
  solid: 'fas',
  regular: 'far',
  brands: 'fab'
};

const fontawesomeMap = new Map(
  fontawesome.map((item) => [item.name, item])
);

const fallbackIcon =
  fontawesomeMap.get('circle-question') ||
  fontawesomeMap.get('question-circle') ||
  fontawesome[0] ||
  {
    name: '',
    styles: ['solid'],
    label: ''
  };

const normalizeString = (value = '') => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().toLowerCase();
};

export const normalizeFontAwesomePrefix = (prefix = '') => {
  const style = prefixToStyle[normalizeString(prefix)];
  if (!style) {
    return '';
  }
  return styleToPrefix[style];
};

export const getFontAwesomePrefixFromStyles = (styles = []) => {
  if (!Array.isArray(styles)) {
    return 'fas';
  }

  if (styles.includes('solid')) {
    return 'fas';
  }
  if (styles.includes('regular')) {
    return 'far';
  }
  if (styles.includes('brands')) {
    return 'fab';
  }
  return 'fas';
};

const pickStyleForIcon = ({ icon = false, preferredPrefix = '' } = {}) => {
  if (!icon || !Array.isArray(icon.styles)) {
    return 'solid';
  }

  const preferredStyle = prefixToStyle[normalizeString(preferredPrefix)];
  if (preferredStyle && icon.styles.includes(preferredStyle)) {
    return preferredStyle;
  }

  if (icon.styles.includes('solid')) {
    return 'solid';
  }
  if (icon.styles.includes('regular')) {
    return 'regular';
  }
  if (icon.styles.includes('brands')) {
    return 'brands';
  }
  return 'solid';
};

const resolveLegacyIcon = ({ name = '', prefix = '' } = {}) => {
  const visited = new Set();
  let nextName = normalizeString(name);
  let nextPrefix = normalizeFontAwesomePrefix(prefix);

  while (nextName && !visited.has(nextName) && fontawesomeShims[nextName]) {
    visited.add(nextName);

    const shim = fontawesomeShims[nextName];

    nextName = normalizeString(shim.name || nextName);

    if (shim.prefix) {
      nextPrefix = normalizeFontAwesomePrefix(shim.prefix);
    }
  }

  return {
    name: nextName,
    prefix: nextPrefix
  };
};

export const normalizeFontAwesomeIcon = ({
  name = '',
  prefix = '',
  label = ''
} = {}) => {
  if (!normalizeString(name)) {
    return {
      name: '',
      prefix: '',
      label: typeof label === 'string' ? label : ''
    };
  }

  const resolved = resolveLegacyIcon({ name, prefix });

  let icon = fontawesomeMap.get(resolved.name);
  if (!icon) {
    icon = fallbackIcon;
  }

  const style = pickStyleForIcon({
    icon: icon,
    preferredPrefix: resolved.prefix || prefix
  });

  return {
    name: icon.name,
    prefix: styleToPrefix[style] || 'fas',
    label: icon.label || label || icon.name
  };
};
