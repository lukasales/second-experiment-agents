# Binary Judge - Iteration 10

## Decision

Accepted

## Why

The first classes backend slice works as requested:

- `GET /api/classes` returns the persisted classes list
- `POST /api/classes` creates a class successfully
- invalid class payload returns `400`
- class data is persisted in JSON
- backend build succeeds

The implementation also stayed localized, used the required class shape, and avoided over-scoping into update/delete, assessments, or notifications.

## Evidence

- backend build succeeded
- initial `GET /api/classes` returned an array
- valid `POST /api/classes` returned a created record with generated id
- `GET /api/classes` after creation returned the persisted class
- invalid payload returned `400`
- invalid semester returned `400`
- `classes.json` contained the persisted class

## What must happen next

- record this iteration in the spreadsheet
- commit the iteration
- move to the next classes backend slice, preferably update/delete