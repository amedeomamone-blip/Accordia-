# Accordia Workflow Notes

- Default workflow: after each completed work block, stage the changes, create a Git commit, and push to `origin/main`.
- Exception: skip commit/push only if the user explicitly asks to keep changes local, pause before publishing, or review before pushing.
- Before pushing, run the relevant verification for the change when practical, typically `make build` and `make check-links`.
- In lesson pages, keep the mini navigation timelines visible in the page structure. Do not remove `nucleus-mini-timeline` or `topic-rail` from lesson pages unless the user explicitly asks for it.
- For the Barocco lesson architecture and future lesson pages that should reuse its visual system, follow `docs/barocco-lesson-system.md`: the Timeline band is the typographic source of truth, card rails must be full-bleed, and tablet/iPhone proportions should preserve all teaching elements in one compact band.
