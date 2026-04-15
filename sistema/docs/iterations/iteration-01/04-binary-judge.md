# Binary Judge - Iteration 01

## Decision

Accepted with manual adjustment

## Why

The implemented backend slice works as requested and the core behavior is present:
- `GET /api/students` returns the persisted student list
- `POST /api/students` accepts valid input and creates a student
- invalid input is rejected with `400` and field-specific validation errors
- JSON persistence is confirmed in `server/data/students.json`

However, there are limited quality issues that should be addressed in a follow-up iteration:
- duplicate CPF/email values are allowed
- routing/business logic is still coupled in `server/src/modules/students/index.ts`
- repository path resolution uses `process.cwd()` and is brittle

## Evidence

- `npm run build` succeeded
- `GET /api/students` returned `200` and the persisted student list
- valid `POST /api/students` returned `201` with created student JSON
- invalid `POST /api/students` returned `400` with validation errors for `name`, `cpf`, and `email`
- persisted student records were found in `server/data/students.json`

## What must happen next

- accept the iteration
- record the iteration in the spreadsheet
- commit the iteration
- in the next student iteration:
  - add duplicate CPF/email validation
  - improve file path handling in `student.repository.ts`
  - consider extracting a service layer