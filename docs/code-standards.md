# Code Standards

## Scope

This document defines coding and structural standards for this repository.

## Language & Module Style

- Use modern JavaScript with ES module imports/exports.
- Keep module entrypoints at `index.js` in each component directory.
- Prefer single-responsibility modules over cross-cutting utility logic embedded in UI modules.

## Naming Conventions

- Component module namespace objects are lowercase (e.g., `theme`, `layout`, `header`).
- Constructor-like UI classes/functions use `PascalCase` (e.g., `Search`, `Modal`, `Button`).
- Utility helpers use descriptive lowercase names (e.g., `applyCSSVar`, `trimString`).
- State path keys should remain stable and explicit because they are persisted.

## State Management Rules

- Shared runtime state lives in `component/state` (`state.current`).
- Persist user-impacting changes via `data.save()`.
- Avoid direct mutation of persisted schema shape without update/migration handling.
- When adding persisted fields, define sane defaults in `state.default`.

## Data Migration Rules

- Any breaking state-shape change must include migration logic.
- Add migration steps in `component/update` (and related legacy chain if needed).
- Preserve backward compatibility for existing user backup files.

## UI/DOM Patterns

- Build DOM via existing node helpers (`node`, `complexNode`) where possible.
- Keep render and clear paths paired (`render()` / `clear()`) for dynamic lists.
- Re-render flows should route through orchestrators like `groupAndBookmark.render()`.

## Styling Standards

- Component styles live beside component code (`component/<name>/index.css`).
- Global layers stay in `src/style/*`.
- Use CSS variables and helper utilities for theming consistency.

## Dependency Usage

- Allowed third-party runtime dependencies currently include `moment`, `sortablejs`, and `webfontloader`.
- Add dependencies only with clear justification and impact notes.

## Lint & Quality Gates

- Run `npm run lint` for all JS changes.
- Run `npm run build` before release-impacting changes.
- If adding complex behavior, include manual test steps in PR/commit notes.

## Repository Hygiene

- Keep docs in `docs/` as source of truth.
- Update docs when:
  - persisted state schema changes,
  - build/deploy steps change,
  - architecture boundaries shift.

## Testing Guidance (Current Gap)

- There is no automated test suite in this repository today.
- Minimum verification for significant changes:
  - Load app in dev mode.
  - Validate bookmark/group editing flows.
  - Validate import/export path if state shape changed.
  - Validate extension packaging with `npm run build`.

