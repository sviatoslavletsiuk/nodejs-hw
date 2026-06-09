# TODO

## Goal

Fix the remaining issues so that all assignments are accepted.

## Steps

- [ ] Update `src/routes/notesRoutes.js` to export router as default export (no named export).
- [ ] Update `src/server.js` to import notes router as default import and remove unnecessary conditional logic with `fileURLToPath`/`process.argv[1]`.
- [x] Update `src/db/connectMongoDB.js` to terminate process explicitly with non-zero exit code on connection error.

- [ ] Run linter/tests (if available) or start the server to ensure everything works.
