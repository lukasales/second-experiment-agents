# Iteration 11 - Classes backend slice B

## Purpose

This iteration completes the basic classes backend CRUD by adding update and delete flows.

## Functional scope

Implement only:
- `PUT /api/classes/:id`
- `DELETE /api/classes/:id`

## Expected backend behavior

- `PUT /api/classes/:id` updates an existing class using the current class shape
- `PUT /api/classes/:id` returns `404` if the class does not exist
- `DELETE /api/classes/:id` deletes an existing class
- `DELETE /api/classes/:id` returns `404` if the class does not exist
- updated and deleted records are persisted correctly in JSON

## Expected class shape

The class shape must remain:
- `id`
- `topic`
- `year`
- `semester`
- `studentIds`
- `assessmentsByStudent`

## Explicitly out of scope

Do not implement:
- frontend changes
- advanced enrollment workflows
- assessments business logic
- notifications
- broad backend refactors

## Technical constraints

- keep the implementation modular
- keep validation centralized
- keep route handlers thin
- do not introduce competing field names
- preserve the current classes JSON persistence strategy

## Acceptance criteria

1. `PUT /api/classes/:id` works for valid payload.
2. `PUT /api/classes/:id` returns `404` for missing class.
3. `DELETE /api/classes/:id` works.
4. `DELETE /api/classes/:id` returns `404` for missing class.
5. `classes.json` reflects update and delete correctly.
6. `npm run build` succeeds.

## Expected risk points

- duplicated validation logic
- inconsistent 404 handling
- wrong class selection by id
- accidental drift from the existing class shape