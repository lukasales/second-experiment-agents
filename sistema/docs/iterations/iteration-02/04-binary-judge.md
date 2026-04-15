# Binary Judge - Iteration 02

## Decision

Accepted

## Why

The implemented backend slice works as requested and the planned behaviors are present:

- duplicate CPF on create is rejected with `409`
- duplicate email on create is rejected with `409`
- `PUT /api/students/:id` updates an existing student with `200`
- `PUT /api/students/:id` returns `404` when the student does not exist
- `PUT /api/students/:id` returns `409` when CPF or email conflicts with another student
- JSON persistence remains correct after update operations

The implementation improved the internal structure by adding a service layer and keeping validation shared between create and update.

## Evidence

- `npm run build` succeeded
- `GET /api/students` returned the expected student list
- duplicate CPF create returned `409`
- duplicate email create returned `409`
- valid update returned `200` with updated student data
- update for missing id returned `404`
- conflicting update returned `409`
- `students.json` reflected the successful update correctly

## What must happen next

- record this iteration in the spreadsheet
- commit the iteration
- move to the next students iteration, which should complete the backend CRUD with `DELETE /api/students/:id`