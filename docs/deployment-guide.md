# Deployment Guide

## Overview

This project produces two primary outputs from the same source:

- Web output for static hosting: `dist/web/`
- Extension package zip: `dist/extension/<appName>_<version>.zip`

## Prerequisites

- Node.js 20+
- npm

## Install Dependencies

```bash
npm install
```

## Development Run

```bash
npm start
```

- Uses webpack dev server with `webpack.dev.js`.
- Opens local app (typically `http://localhost:8080`).

## Production Build

```bash
npm run build
```

Build behavior:
- Uses `webpack.prod.js` merged with common config.
- Minifies CSS and JS.
- Copies extension assets (`manifest`, icons, locales, initial background script).
- Generates extension zip under `dist/extension/`.

## Packaging for Browser Extension Use

1. Run `npm run build`.
2. Locate zip in `dist/extension/`.
3. For Chrome/Chromium:
- Open extensions page.
- Enable developer mode.
- Load unpacked from `dist/web/` or use zip as distribution artifact where supported.
4. For Firefox:
- Use generated package per add-on submission/install flow.

## GitHub Pages Deployment

- Workflow: `.github/workflows/gh-pages-deploy.yml`
- Trigger: push to `main`
- Action:
  - installs dependencies
  - runs build
  - deploys `dist/web` to `gh-pages` branch

## Release Checklist

1. Update version in `src/manifest.json` and `src/component/version/index.js` consistently.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Validate generated `dist/web` app manually.
5. Validate extension package installation.
6. Publish artifacts/release notes.

## Common Issues

- Build fails due to dependency drift:
  - Remove and reinstall dependencies (`npm install`) in clean environment.
- Extension loads but localization missing:
  - Confirm `_locales` were copied from `src/locale` to build output.
- Style or asset missing in build:
  - Check webpack asset loader rules and copy plugin patterns.

