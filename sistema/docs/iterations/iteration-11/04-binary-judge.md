# Binary Judge - Iteration 11

## Decision

Accepted

## Why

The classes backend slice works as requested:

- `PUT /api/classes/:id` updates an existing class
- `PUT /api/classes/:id` returns `404` when the class does not exist
- `DELETE /api/classes/:id` deletes an existing class
- `DELETE /api/classes/:id` returns `404` when the class does not exist
- `classes.json` reflects update and delete correctly
- backend build succeeds

The implementation also stayed localized to the classes backend and preserved the current class shape.

## Evidence

- backend build succeeded
- valid `PUT /api/classes/:id` returned the updated class
- invalid `PUT` with non-existing id returned `404`
- valid `DELETE /api/classes/:id` worked after clean server restart
- invalid `DELETE` with non-existing id returned `404`
- `classes.json` reflected the update and then the deletion correctly

## What must happen next

- record this iteration in the spreadsheet
- commit the iteration
- move to the next lot, preferably the first classes frontend slice