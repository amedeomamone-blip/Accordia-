# Accordia Workflow Notes

- Default workflow: after each completed work block, stage the changes, create a Git commit, and push to `origin/main`.
- Exception: skip commit/push only if the user explicitly asks to keep changes local, pause before publishing, or review before pushing.
- Before pushing, run the relevant verification for the change when practical, typically `make build` and `make check-links`.
