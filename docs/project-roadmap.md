# Project Roadmap

## Baseline (Current)

- Modular extension architecture with robust customization surface.
- Data migration path exists for legacy versions.
- Build and lint pipeline is in place.
- Documentation baseline now established in `docs/`.

## Milestone 1: Stability & Quality (0-1 month)

1. Add minimum automated checks
- Add smoke tests for boot/render/persistence-critical flows.
- Include CI job for lint + build on pull requests.

2. Reduce regression hotspots
- Identify and split oversized modules (`fontawesome`, major settings modules, bookmark forms).
- Add module-level ownership notes and change risk tags.

3. Harden data handling
- Add schema validation guardrail for imported JSON.
- Expand migration verification checklist.

## Milestone 2: Developer Experience (1-2 months)

1. Documentation and onboarding
- Keep docs synced with architecture changes.
- Add troubleshooting decision tree for common extension install/build issues.

2. Tooling improvements
- Add formatting/linting consistency checks in CI.
- Introduce basic bundle-size tracking over time.

3. Internal API consistency
- Normalize component method naming (`render`, `clear`, `init`, `update`).
- Reduce duplicated control wiring patterns.

## Milestone 3: Product Enhancements (2-4 months)

1. Search improvements
- Optional engine-specific behavior enhancements.
- Improve UX for bookmark search state and empty results.

2. Theme and layout UX
- Improve discoverability of advanced settings.
- Add safe presets and reversible experiments.

3. Localization readiness
- Revisit runtime language pack loading strategy.
- Add translation completeness checks.

## Milestone 4: Long-Term Maintainability (4+ months)

1. State layer evolution
- Evaluate moving to a more explicit state transition model.
- Introduce schema version contract documentation.

2. Performance budget
- Define startup/render budgets and monitor drift.
- Optimize heavy render paths in bookmark and settings areas.

3. Release governance
- Add release checklist automation and changelog conventions.
- Introduce compatibility matrix for browser/runtime versions.

## Risks to Roadmap Delivery

- Limited test coverage slows safe refactoring.
- Architecture modernization may require staged migration.
- Packaging/deployment drift across browser ecosystems.

## Tracking Suggestions

- Track progress by milestone tickets.
- Record architectural decisions in lightweight ADR notes under `docs/`.

