# Design Guidelines

## Design Intent

nightTab should feel calm, legible, and configurable without overwhelming users. Visual flexibility is a core feature, but defaults must remain clean and balanced.

## Core Principles

1. Clarity first
- Prioritize readable information hierarchy for clock/date/search/bookmarks.

2. Personalization without chaos
- Expose powerful controls while maintaining safe defaults and predictable behavior.

3. Fast interaction loops
- Editing bookmarks, changing theme settings, and search should feel immediate.

4. Consistent control patterns
- Similar settings should use similar control UI and terminology.

## Layout Guidelines

- Maintain clear separation between header and bookmark zones.
- Preserve responsive behavior across breakpoints (`xs` to `xxl`).
- Avoid introducing layout modes that conflict with current alignment/order semantics.

## Typography Guidelines

- Ensure display text remains readable at extreme size settings.
- Respect default fallback stacks when custom fonts are unavailable.
- Validate contrast across dark/light/system style states.

## Color & Theme Guidelines

- Prefer CSS variable-driven color application to keep theme behavior centralized.
- When adding new themed elements, map them to existing theme token patterns.
- Guard against unreadable combinations at low opacity or extreme contrast settings.

## Motion & Feedback

- Use animation for state feedback only when it improves comprehension.
- Keep transitions short and non-blocking.
- Ensure animated feedback classes are removable/resettable cleanly.

## Bookmark UX Guidelines

- Search mode should clearly communicate filtered state.
- Drag-and-drop should be disabled during search to avoid contradictory interactions.
- Empty states must provide clear next actions.

## Accessibility & Usability

- Preserve keyboard accessibility for major actions.
- Keep icon-only controls paired with accessible labels/titles.
- Maintain sufficient contrast and hit area size for frequent actions.

## Internationalization Considerations

- Avoid hard-coded text in new UI modules.
- Route user-facing strings through message resources.
- Test layouts with longer translated strings.

## Do/Don't Summary

Do:
- Reuse existing components and control patterns.
- Keep defaults stable and readable.
- Validate behavior in both edit and normal modes.

Don't:
- Introduce one-off visual conventions per feature.
- Add hidden stateful behavior without clear user feedback.
- Bypass theme/state utilities for direct style hacks.

