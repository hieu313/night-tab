# Project Overview & PDR

## Product Summary

nightTab is a customizable new-tab extension for Chrome/Chromium and Firefox-style environments. It replaces the default new tab with a configurable dashboard containing time/date, search, and bookmark groups, with strong emphasis on personalization.

## Problem Statement

Default browser new tab pages are often ad-driven, minimally customizable, and not optimized for users who want both visual control and fast access to grouped links.

## Product Goals

- Provide a fast, privacy-friendly, local-first new-tab dashboard.
- Offer deep personalization without requiring external services.
- Keep bookmark/group management directly on the new-tab surface.
- Preserve user setups across versions via migration and import/export.

## Non-Goals

- Cloud sync service managed by this app.
- User account/auth system.
- Backend API dependencies for core functionality.

## Primary Users

- Power users who open many tabs and want categorized quick links.
- Users who care about visual customization and keyboard-driven workflows.
- Users who want local data control with import/export backup.

## Functional Requirements

1. New-tab override
- Extension must replace browser new-tab page via manifest override.

2. Configurable header modules
- Clock/date/greeting/transitional text/search can be shown/hidden and reordered.

3. Bookmark and group management
- Create/edit/remove groups and bookmarks.
- Drag-and-drop sorting for groups and bookmarks.
- Edit/add modes with clear UI states.

4. Search behavior
- Local bookmark filtering by name/url.
- Optional web search submit via selected engine (Google, DuckDuckGo, YouTube, Giphy, Bing, custom).

5. Theme and layout customization
- Accent and palette controls.
- Background mode: theme/accent/color/gradient/image/video.
- Typography and opacity/radius/shadow controls.
- Layout controls for size, spacing, direction, and alignment.

6. Persistence and data portability
- Save all setup/bookmark/theme state locally.
- Export JSON backup.
- Import from file or clipboard with validation and selective restore.

7. Keyboard shortcuts
- Support predefined shortcuts for edit mode, add, menu, style toggle, random accent, and escape behavior.

8. Internationalization support
- Extension i18n message support through browser APIs.
- Locale resources packaged under `_locales` at build time.

## Non-Functional Requirements

- Performance: new-tab render should feel immediate on typical desktop hardware.
- Reliability: invalid imported data must fail safely with feedback.
- Privacy: core usage should remain local-first with no required network backend.
- Maintainability: modular component structure and migration path for old data versions.

## Constraints

- Manifest V3 extension constraints.
- Storage is localStorage-based (subject to browser limits).
- Runtime behavior differs slightly between dev web mode and installed extension mode.

## Success Metrics

- Stable boot without migration or rendering regressions across releases.
- High import/export success rate for existing user backups.
- Low issue rate for layout/theme regressions after feature changes.

## Risks & Mitigations

- Risk: State schema drift across versions.
  - Mitigation: keep explicit migration steps in `component/update` + legacy chain.

- Risk: Large modules become hard to change safely.
  - Mitigation: enforce module boundaries and document ownership hotspots.

- Risk: Feature growth without tests increases regressions.
  - Mitigation: establish minimum smoke tests and lint + build checks in CI.

## Acceptance Criteria (Documentation Baseline)

- Developer can run, build, and package extension from docs only.
- New contributor can identify architecture layers and key modules quickly.
- Docs include roadmap and standards for future changes.

