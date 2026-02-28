# System Architecture

## Architecture Overview

nightTab is a client-side, local-first browser extension app with no backend service. It is built as a modular JavaScript SPA-like runtime rendered inside the extension new-tab page.

## Layered View

1. Bootstrap layer
- `src/index.js` initializes top-level components in a defined order.

2. Domain/UI components
- `src/component/*` modules manage behavior and rendering for layout, header, bookmarks, theme, menu, and forms.

3. Shared state & persistence
- `component/state` defines defaults/options/min-max.
- `component/data` handles localStorage persistence, import/export, and reload.

4. Utility layer
- `src/utility/*` contains helpers for DOM creation, object path access, CSS application, color conversion, and validation.

5. Styling layer
- Global style primitives in `src/style/*`.
- Component-local styles in `src/component/**/index.css`.

## Runtime Flow

1. Boot
- App logs version and initializes data/theme/layout/toolbar/header/group/bookmark and keyboard.

2. Data restore
- `data.init()` loads saved state from localStorage.
- If version mismatch is detected, migration pipeline runs.

3. Render
- Layout scaffolding is attached to DOM.
- Header/bookmark/group sections render based on state flags.
- Theme applies CSS variables/classes/states and background assets.

4. Interaction
- UI controls mutate `state.current`.
- Changes are persisted through `data.save()`.
- Re-render orchestration modules refresh affected sections.

## Key Modules

- `component/state`: default schema + constraints/options.
- `component/data`: persistence/import/export/migration invocation.
- `component/theme`: color systems, fonts, background rendering, CSS var/class/state application.
- `component/layout`: root structure, breakpoints, title/favicon handling.
- `component/header`: header item ordering, search placement, sortable behavior.
- `component/group` + `component/bookmark`: group/link CRUD and sorting behavior.
- `component/groupAndBookmark`: unified re-render controller, especially for search mode.
- `component/search`: local bookmark filter + external search form binding.

## Persistence Model

- Main storage key: `nightTab` (`APP_NAME`).
- Backup key pattern: `nightTabBackup`.
- Stored payload includes:
  - schema marker,
  - version,
  - user state,
  - bookmark structures.

## External Integrations

- Browser APIs:
  - `chrome_url_overrides.newtab` (manifest)
  - `chrome.i18n` / `browser.i18n`
  - `chrome.tabs.create` for opening bookmark links in new tabs
- Library usage:
  - `sortablejs` for drag/sort
  - `moment` for date/time formatting
  - `webfontloader` for dynamic font loading

## Build & Packaging Architecture

- `webpack.common.js` defines entry, loaders, and asset copy pipeline.
- `webpack.dev.js` enables development mode with source maps.
- `webpack.prod.js` enables CSS/JS minimization and extension zip packaging.
- Build artifacts:
  - `dist/web` for web/static deployment
  - `dist/extension` zip for extension distribution

## Deployment Topology

- GitHub Actions workflow builds and deploys `dist/web` to `gh-pages` branch.
- Extension packaging is produced locally from production build output.

## Architectural Risks

- Very large component files increase change risk.
- localStorage-only persistence may hit quota for heavy user content.
- Lack of automated tests raises regression probability during refactors.

