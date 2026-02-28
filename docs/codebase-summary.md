# Codebase Summary

## Scouting Scope

- Repository root scanned dynamically (existing directories only).
- Exclusions applied: `.git`, `node_modules`, `.claude`, `.opencode`, `tests`, `__pycache__`, `secrets`, `dist`.
- Binary/static artifact types excluded from LOC counts (`png`, `gif`, `woff*`, `ttf`, etc.).
- `package-lock.json` excluded from LOC to keep source-focused metrics.

## Scout Execution Note

- Requested `scout` skill is not available in this session.
- Equivalent manual scouting was executed directly over the codebase.

## Headline Metrics

- Text/source files counted: **314**
- Total LOC counted: **97,554**
- Dominant file types: `js` (203), `css` (73), `json` (28)

## Build & Runtime Snapshot

- Entrypoint: `src/index.js`
- Extension manifest: `src/manifest.json` (MV3)
- Build configs: `webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`
- Key runtime domains:
  - data/state persistence
  - theme and layout rendering
  - header/search behavior
  - bookmark/group management

## Notable Hotspots (Largest Files by LOC)

| File | LOC |
|---|---:|
| `src/component/fontawesome/index.js` | 7,188 |
| `src/component/fontawesome/index.css` | 6,097 |
| `src/locale/*/messages.json` (most locales) | 2,778 |
| `src/component/menuContent/themeSetting/index.js` | 2,111 |
| `src/component/menuContent/headerSetting/index.js` | 1,859 |
| `src/component/updateLegacy/index.js` | 1,381 |
| `src/component/bookmarkForm/index.js` | 1,330 |
| `src/component/bookmark/index.css` | 1,128 |
| `src/component/showcase/index.js` | 946 |

## LOC by Directory

| Directory | Files | LOC |
|---|---:|---:|
| `./src/component/fontawesome` | 2 | 13285 |
| `./src/locale/bn` | 1 | 2778 |
| `./src/locale/de` | 1 | 2778 |
| `./src/locale/en_US` | 1 | 2778 |
| `./src/locale/es` | 1 | 2778 |
| `./src/locale/fil` | 1 | 2778 |
| `./src/locale/fr` | 1 | 2778 |
| `./src/locale/gu` | 1 | 2778 |
| `./src/locale/hi` | 1 | 2778 |
| `./src/locale/id` | 1 | 2778 |
| `./src/locale/it` | 1 | 2778 |
| `./src/locale/ja` | 1 | 2778 |
| `./src/locale/ms` | 1 | 2778 |
| `./src/locale/pt` | 1 | 2778 |
| `./src/locale/ru` | 1 | 2778 |
| `./src/locale/uk` | 1 | 2778 |
| `./src/locale/vi` | 1 | 2778 |
| `./src/locale/en_GB` | 1 | 2770 |
| `./src/component/menuContent/themeSetting` | 1 | 2111 |
| `./src/component/menuContent/headerSetting` | 1 | 1859 |
| `./src/component/bookmark` | 2 | 1701 |
| `./src/component/bookmarkForm` | 2 | 1398 |
| `./src/component/updateLegacy` | 1 | 1381 |
| `./src/component/showcase` | 2 | 1014 |
| `./src/utility` | 23 | 995 |
| `./src/component/theme` | 2 | 894 |
| `./src/component/customThemeTile` | 2 | 723 |
| `./src/component/update` | 1 | 651 |
| `.` | 10 | 629 |
| `./src/component/header` | 2 | 618 |
| `./src/component/bookmarkTile` | 1 | 601 |
| `./src/component/menuContent/groupSetting` | 1 | 579 |
| `./src/component/form/group` | 2 | 562 |
| `./src/component/presetThemeTile` | 2 | 560 |
| `./docs` | 7 | 546 |
| `./src/component/menuContent/layoutSetting` | 1 | 533 |
| `./src/component/group` | 2 | 518 |
| `./src/component/layout` | 2 | 516 |
| `./src/component/toolbarControl` | 2 | 486 |
| `./src/component/data` | 1 | 462 |
| `./src/component/suggest` | 2 | 461 |
| `./src/component/menuContent/bookmarkSetting` | 1 | 449 |
| `./src/component/modal` | 2 | 432 |
| `./src/component/groupArea` | 1 | 410 |
| `./src/component/button` | 2 | 393 |
| `./src/component/menuFrame` | 2 | 370 |
| `./src/component/menuNav` | 2 | 367 |
| `./src/component/date` | 2 | 359 |
| `./src/component/form/input/inputButton` | 2 | 354 |
| `./src/component/search` | 2 | 354 |
| `./src/component/clock` | 2 | 322 |
| `./src/component/control/colorMixer` | 1 | 321 |
| `./src/style/reset` | 1 | 313 |
| `./src/component/form/input/range` | 2 | 310 |
| `./src/component/edge` | 2 | 303 |
| `./src/component/state` | 1 | 297 |
| `./src/component/tab` | 2 | 290 |
| `./src/component/bookmarkPreview` | 2 | 283 |
| `./src/component/form/input/checkbox` | 2 | 279 |
| `./src/component/groupForm` | 2 | 264 |
| `./src/component/control/slider` | 1 | 262 |
| `./src/component/dropdown` | 2 | 260 |
| `./src/component/control/sliderDouble` | 1 | 257 |
| `./src/component/menuContent` | 2 | 257 |
| `./src/component/headerItem` | 2 | 254 |
| `./src/component/menuContent/debugSetting` | 1 | 254 |
| `./src/component/menuContent/toolbarSetting` | 1 | 252 |
| `./src/component/form/input/radio` | 2 | 250 |
| `./src/component/form/input/text` | 2 | 238 |
| `./src/component/control/color` | 1 | 227 |
| `./src/component/control/sliderSlim` | 1 | 211 |
| `./src/component/menuContent/dataSetting` | 1 | 199 |
| `./src/component/control/radio` | 1 | 198 |
| `./src/component/collapse` | 2 | 192 |
| `./src/component/form/inline` | 2 | 192 |
| `./src/component/message` | 1 | 181 |
| `./src/component/control/inputButton` | 1 | 179 |
| `./src/style/typography` | 1 | 177 |
| `./src/component/transitional` | 2 | 171 |
| `./src/component/control/radioGrid` | 1 | 170 |
| `./src/component/form/grid` | 2 | 169 |
| `./src/component/icon` | 2 | 165 |
| `./src/component/bookmarkPreset` | 1 | 161 |
| `./src/component/logo` | 2 | 158 |
| `./src/component/form/input/select` | 2 | 151 |
| `./src/component/greeting` | 2 | 146 |
| `./src/component/customTheme` | 1 | 141 |
| `./src/component/importForm` | 2 | 134 |
| `./src/component/shadeBar` | 2 | 133 |
| `./src/component/menuContent/supportSetting` | 1 | 132 |
| `./src/component/dropFile` | 2 | 130 |
| `./src/component/form/input/color` | 2 | 129 |
| `./src/component/link` | 1 | 128 |
| `./src/style/animation` | 1 | 127 |
| `./src/component/accentPresetButton` | 2 | 126 |
| `./src/component/body` | 2 | 124 |
| `./src/component/control/textReset` | 1 | 122 |
| `./src/component/keyboard` | 1 | 119 |
| `./src/component/form/input/textarea` | 2 | 114 |
| `./src/component/accentPreset` | 1 | 113 |
| `./src/component/form/groupText` | 2 | 113 |
| `./src/component/form/label` | 2 | 111 |
| `./src/component/control/select` | 1 | 105 |
| `./src/component/alert` | 2 | 100 |
| `./src/component/themePreset` | 1 | 99 |
| `./src/component/easterEgg` | 1 | 88 |
| `./.github/ISSUE_TEMPLATE` | 2 | 86 |
| `./src/component/groupEmpty` | 2 | 86 |
| `./src/component/searchEmpty` | 2 | 85 |
| `./src/style/utility` | 1 | 85 |
| `./src/component/control/text` | 1 | 84 |
| `./src/component/control/textarea` | 1 | 84 |
| `./src/component/bookmarkEmpty` | 2 | 83 |
| `./src/component/control/checkbox` | 1 | 83 |
| `./src/component/menuClose` | 2 | 83 |
| `./src` | 4 | 81 |
| `./src/component/splash` | 2 | 80 |
| `./src/component/video` | 1 | 80 |
| `./src/component/shade` | 2 | 79 |
| `./src/component/menuContent/appSetting` | 1 | 76 |
| `./src/component/menuContent/languageSetting` | 1 | 75 |
| `./src/component/form/feedback` | 2 | 70 |
| `./src/component/form/helper` | 2 | 63 |
| `./src/style/state` | 1 | 63 |
| `./src/component/menu` | 1 | 62 |
| `./src/icon` | 2 | 62 |
| `./src/component/form/input` | 2 | 55 |
| `./src/component/customThemeForm` | 1 | 54 |
| `./src/component/groupAndBookmark` | 1 | 50 |
| `./src/component/form` | 2 | 48 |
| `./src/component/form/input/number` | 2 | 48 |
| `./src/component` | 1 | 44 |
| `./src/component/control/groupText` | 1 | 43 |
| `./src/component/control/helperText` | 1 | 40 |
| `./src/component/version` | 1 | 38 |
| `./src/component/control/label` | 1 | 37 |
| `./src/component/menuContent/coffeeSetting` | 1 | 37 |
| `./src/component/form/input/file` | 2 | 35 |
| `./src/component/toolbar` | 1 | 34 |
| `./src/component/control` | 1 | 29 |
| `./src/component/form/wrap` | 2 | 29 |
| `./.github/workflows` | 1 | 28 |
| `./src/component/stagedGroup` | 1 | 28 |
| `./src/component/themePreset/acrid` | 1 | 27 |
| `./src/component/themePreset/aerial` | 1 | 27 |
| `./src/component/themePreset/azure` | 1 | 27 |
| `./src/component/themePreset/bean` | 1 | 27 |
| `./src/component/themePreset/comet` | 1 | 27 |
| `./src/component/themePreset/corsair` | 1 | 27 |
| `./src/component/themePreset/dash` | 1 | 27 |
| `./src/component/themePreset/deco` | 1 | 27 |
| `./src/component/themePreset/earthquake` | 1 | 27 |
| `./src/component/themePreset/funkadelic` | 1 | 27 |
| `./src/component/themePreset/grimm` | 1 | 27 |
| `./src/component/themePreset/hive` | 1 | 27 |
| `./src/component/themePreset/hypnos` | 1 | 27 |
| `./src/component/themePreset/infrared` | 1 | 27 |
| `./src/component/themePreset/kapow` | 1 | 27 |
| `./src/component/themePreset/koto` | 1 | 27 |
| `./src/component/themePreset/lex` | 1 | 27 |
| `./src/component/themePreset/macaroon` | 1 | 27 |
| `./src/component/themePreset/marker` | 1 | 27 |
| `./src/component/themePreset/midnight` | 1 | 27 |
| `./src/component/themePreset/mint` | 1 | 27 |
| `./src/component/themePreset/neon` | 1 | 27 |
| `./src/component/themePreset/nord` | 1 | 27 |
| `./src/component/themePreset/obsidian` | 1 | 27 |
| `./src/component/themePreset/origin` | 1 | 27 |
| `./src/component/themePreset/outrun` | 1 | 27 |
| `./src/component/themePreset/pepper` | 1 | 27 |
| `./src/component/themePreset/point` | 1 | 27 |
| `./src/component/themePreset/pumpkin` | 1 | 27 |
| `./src/component/themePreset/replica` | 1 | 27 |
| `./src/component/themePreset/rumble` | 1 | 27 |
| `./src/component/themePreset/savage` | 1 | 27 |
| `./src/component/themePreset/scoria` | 1 | 27 |
| `./src/component/themePreset/snow` | 1 | 27 |
| `./src/component/themePreset/sol` | 1 | 27 |
| `./src/component/themePreset/steel` | 1 | 27 |
| `./src/component/themePreset/stria` | 1 | 27 |
| `./src/component/themePreset/terra` | 1 | 27 |
| `./src/component/themePreset/trine` | 1 | 27 |
| `./src/component/themePreset/umbra` | 1 | 27 |
| `./src/component/themePreset/vanadium` | 1 | 27 |
| `./src/component/themePreset/viper` | 1 | 27 |
| `./src/component/keyboardShortcut` | 1 | 26 |
| `./src/style/font` | 1 | 26 |
| `./src/component/form/indent` | 2 | 25 |
| `./src/component/bookmarkMinMax` | 1 | 23 |
| `./src/component/pageLock` | 1 | 22 |
| `./src/component/browserDetect` | 1 | 21 |
| `./src/component/customThemeDefault` | 1 | 21 |
| `./src/component/themePreset/app` | 1 | 20 |
| `./src/component/bookmarkDefault` | 1 | 19 |
| `./src/component/form/sticky` | 2 | 19 |
| `./src/component/themePreset/black` | 1 | 19 |
| `./src/component/themePreset/white` | 1 | 19 |
| `./src/component/stagedBookmark` | 1 | 18 |
| `./src/component/form/fieldset` | 2 | 15 |
| `./src/component/base` | 1 | 12 |
| `./src/style/zindex` | 1 | 11 |
| `./src/component/groupDefault` | 1 | 10 |
| `./asset/screenshot` | 9 | 9 |
| `./src/component/stagedCustomTheme` | 1 | 9 |
| `./src/component/searchEnginePreset` | 1 | 7 |
| `./src/constant` | 1 | 1 |

## Structural Observations

- State schema is centralized and extensive in `component/state`.
- Migration logic exists and appears to handle multiple historical shapes.
- Several component files are very large, especially settings and bookmark flows.
- Search behavior combines local filtering and external query submission.
- Locale files are large and duplicated per language, affecting repository size.

## Suggested Maintenance Priorities

1. Decompose oversized modules for safer incremental changes.
2. Add smoke/regression tests for state restore + bookmark edit + theme apply.
3. Keep migration map aligned with every persisted schema change.

