# Iteration 10 - Classes backend slice A

## Purpose

This iteration starts the backend implementation of classes.

## Functional scope

Implement only:
- `GET /api/classes`
- `POST /api/classes`
- JSON persistence for classes
- basic validation for class creation

## Expected class shape

At minimum, each class record should include:
- `id`
- `topic`
- `year`
- `semester`
- `studentIds`
- `assessmentsByStudent`

## Expected backend behavior

- `GET /api/classes` returns the persisted classes list
- `POST /api/classes` creates a class with valid payload
- invalid payload returns `400`
- class records are persisted in JSON

## Explicitly out of scope

Do not implement:
- `PUT /api/classes/:id`
- `DELETE /api/classes/:id`
- advanced student enrollment flows
- full assessments logic
- notifications
- frontend changes
- broad backend refactors

## Technical constraints

- keep the implementation modular
- avoid placing all logic in route files
- keep JSON persistence localized to the classes backend slice
- follow the same layering direction already used in students where appropriate

## Acceptance criteria

1. `GET /api/classes` works.
2. `POST /api/classes` works with valid payload.
3. Invalid class payload returns `400`.
4. Classes are persisted in a JSON file.
5. `npm run build` succeeds.

## Expected risk points

- inconsistent class shape
- validation too weak or too broad
- route files taking too much logic
- over-scoping into enrollment or assessments