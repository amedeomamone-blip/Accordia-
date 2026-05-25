# Barocco Lesson System

Use these rules whenever a lesson should reuse the Barocco page architecture.

## Typographic Rule

- The Timeline band is the reference for all future bands.
- Eyebrows are fixed red (`#c14f40`), uppercase, tracked, and compact.
- Band titles, subtitles, dates, and body copy must match the Timeline proportions before inventing new sizes.
- Avoid marketing-style hero typography inside teaching bands; every band must fit the classroom explanation flow.

## Band Heights

- Timeline and First Listening use the compact frame established in `css/barocco-timeline.css` and `css/barocco-first-listening.css`: about `clamp(32rem, 72vh, 48rem)`.
- Key Concepts uses only the height required by its header and cards: about `clamp(31rem, 56vh, 38rem)`.
- Do not make a band taller to solve spacing unless the teaching content genuinely needs it.

## Full-Bleed Card Rails

- Horizontal card rails must behave like Apple-style carousels: the first card starts with breathing room, but the rail itself extends to the viewport edge.
- Use the full-bleed pattern:
  - `width: 100vw`
  - `margin-left: calc(50% - 50vw)`
  - `margin-right: calc(50% - 50vw)`
  - `padding-inline: var(--barocco-carousel-gutter)`
  - `scroll-padding-inline: var(--barocco-carousel-gutter)`
- Do not constrain scrolling card rails to the centered shell, otherwise cards appear to be cut at the page margin.

## Cards

- Cards are white, borderless, softly rounded, and compact.
- Keep title, copy, and image inside the same card without flip effects.
- Images should start from the bottom edge whenever they act as card artwork.
- Rectangular or portrait cards must keep a fixed `aspect-ratio`. Zoom can scale them, but it must never squash or stretch their silhouette.
- Prefer fixed proportions over ad hoc `min-height` tuning when a rail needs to stay visually stable across desktop, iPad, iPhone, and browser zoom.
- For mobile and tablet, reduce card width and text scale slightly before increasing band height.

## First Listening

- Keep the globe on a white stage and give it visual priority.
- The orbiting video previews are the listening navigation. Do not add a separate pill selector unless a lesson explicitly needs one.
- Video previews orbit the globe and open their YouTube link when touched.
- Question cards are sequential: the next card unlocks only after the correct answer.
- Do not show feedback boxes. Wrong answers light red; correct answers light green.
- Locked cards should look inactive, not unreadable.

## Mobile

- iPad and iPhone layouts must preserve the same hierarchy: eyebrow/title/copy, main visual, then card rail.
- Card rails remain full-bleed on mobile with smaller gutters.
- Avoid hiding mini timelines, topic rails, or the interactive card structure to solve fit problems.
