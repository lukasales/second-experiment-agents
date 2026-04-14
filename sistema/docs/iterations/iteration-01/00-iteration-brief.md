# Iteration 01 - Students backend slice A

## Purpose

This iteration starts the real functional implementation of the backend.

It focuses only on the first student-management backend slice:
- list students
- create students
- persist them in JSON
- validate required fields

## Functional scope

Implement only:
- `GET /api/students`
- `POST /api/students`

## Required validation rules

A valid student payload must include:
- `name`
- `cpf`
- `email`

Validation at this stage should reject:
- missing name
- missing cpf
- missing email
- empty string values
- clearly malformed email

## Explicitly out of scope

Do not implement:
- `PUT /api/students/:id`
- `DELETE /api/students/:id`
- frontend integration
- Cucumber tests
- classes
- assessments
- notifications
- advanced CPF check-digit algorithm
- unrelated refactors

## Technical constraints

- Keep the implementation modular.
- Do not place all logic in route files.
- Use JSON persistence under `server/data/`.
- Keep the change set small and reviewable.

## Acceptance criteria

1. `npm run build` succeeds in `sistema/server`.
2. `GET /api/students` returns an array.
3. `POST /api/students` creates a student and persists it in JSON.
4. Invalid payloads are rejected with a clear `400` style response.
5. The implementation is split into reasonable files, not one giant route file.

## Expected risk points

- route logic becoming too large
- validation mixed with persistence
- weak error handling
- duplicated type definitions
- file system logic implemented in a fragile way