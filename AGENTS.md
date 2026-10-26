# Accordia Workflow Notes

- Permanent interface rules: read and follow `docs/design-system.md` before every UI or lesson edit. It records the teacher's 25 October 2026 instructions and takes precedence over older decorative rules. Use the shared stylesheet, header, utility icons and interaction states; do not introduce a new per-lesson visual system.
- The header contains only `amedeo`, with the same placement and dimensions throughout the site. Keep lesson controls and titles below it.
- For Lettura, distinguish figure values from pulse counts. Do not claim that a text follows Ciriaco until the supplied volume's relevant pages have actually been read.

- Default workflow: after each completed work block, stage the changes, create a Git commit, and push to `origin/main`.
- Exception: skip commit/push only if the user explicitly asks to keep changes local, pause before publishing, or review before pushing.
- Before pushing, run the relevant verification for the change when practical, typically `make build` and `make check-links`.
- In lesson pages, keep the mini navigation timelines visible in the page structure. Do not remove `nucleus-mini-timeline` or `topic-rail` from lesson pages unless the user explicitly asks for it.
- For the Barocco lesson architecture and future lesson pages that should reuse its visual system, follow `docs/barocco-lesson-system.md`: the Timeline band is the typographic source of truth, card rails must be full-bleed, and tablet/iPhone proportions should preserve all teaching elements in one compact band.
