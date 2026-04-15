# Binary Judge - Iteration 07

## Decision

Accepted

## Why

The backend validation slice works as requested:

- `POST /api/students` rejects CPF containing non-digit characters
- `POST /api/students` rejects CPF with length different from 11
- `PUT /api/students/:id` rejects CPF containing non-digit characters
- `PUT /api/students/:id` rejects CPF with length different from 11
- valid numeric 11-digit CPF values still work in both create and update flows

The implementation stayed scoped and kept the validation rule centralized in the shared validator.

## Evidence

- `npm run build` succeeded
- invalid POST with letters returned `400`
- invalid POST with short CPF returned `400`
- invalid PUT with letters returned `400`
- invalid PUT with short CPF returned `400`
- valid POST still worked
- valid PUT still worked
- invalid requests did not pollute `students.json`

## What must happen next

- record this iteration in the spreadsheet
- commit the iteration
- move to the next lot, preferably student edit/delete UI or broader frontend integration