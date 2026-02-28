# nightTab Documentation Hub

nightTab is a browser new-tab extension that replaces the default new tab page with a configurable dashboard for time/date, search, theme customization, and bookmark groups.

This repository already contains a legacy project page at `readme.md`; this `README.md` is the new developer-oriented entrypoint.

## Project Snapshot

- App name: `nightTab`
- Current app version: `7.6.0` (`Nebulous Lobster`)
- Runtime target: Browser extension new-tab override
- Manifest: `manifest_version: 3`
- Primary data store: `window.localStorage`
- Build toolchain: `webpack 5`, `eslint 9`

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run Development Build

```bash
npm start
```

Expected local dev server: `http://localhost:8080`.

### Build Production Artifacts

```bash
npm run build
```

Build outputs:
- Web bundle: `dist/web/`
- Extension zip package: `dist/extension/<appName>_<version>.zip`

### Lint

```bash
npm run lint
```

## Documentation Index (`docs/` is source of truth)

- [Project Overview + PDR](docs/project-overview-pdr.md)
- [Codebase Summary](docs/codebase-summary.md)
- [Code Standards](docs/code-standards.md)
- [System Architecture](docs/system-architecture.md)
- [Project Roadmap](docs/project-roadmap.md)
- [Deployment Guide](docs/deployment-guide.md)
- [Design Guidelines](docs/design-guidelines.md)

## Source Layout

```text
src/
  component/          # UI + behavior modules (stateful feature units)
  utility/            # generic helper functions (path access, color conversion, etc.)
  style/              # global style layers (reset/state/typography/utility)
  locale/             # translation files copied to extension _locales/
  icon/               # extension icons
  manifest.json       # extension manifest (MV3)
  index.js            # bootstrap entrypoint
webpack.*.js          # build pipeline (dev/prod/common)
```

## Core Runtime Flow

1. `src/index.js` bootstraps components in order.
2. `component.data.init()` restores or initializes persisted state.
3. Theme/layout/header/toolbar/group/bookmark modules render into DOM.
4. User actions mutate shared state and persist via `data.save()`.

## Key Features

- Flexible layout and visual theming (color systems, fonts, image/video backgrounds)
- Bookmark groups with drag-and-drop ordering and edit mode
- Header modules (clock, date, greeting, search)
- Search that filters bookmarks and can submit to web search engines
- Data export/import/restore and legacy version migration
- Keyboard shortcuts for rapid actions

## Contribution Notes

- Follow style conventions in [docs/code-standards.md](docs/code-standards.md)
- Keep architecture decisions aligned with [docs/system-architecture.md](docs/system-architecture.md)
- Update docs when module behavior or folder structure changes

## Known Gaps (Current State)

- No automated unit/integration test suite in repo
- Localization packs exist, but runtime language pack import is currently narrowed to `en_GB`

