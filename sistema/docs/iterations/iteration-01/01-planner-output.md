# Planner Output - Iteration 01

## 1. Iteration objective

Implement the first backend slice for student management with JSON persistence.

This slice must support:
- `GET /api/students`
- `POST /api/students`

## 2. Out of scope

Do not implement:
- update student
- delete student
- frontend integration
- acceptance tests
- classes
- assessments
- notifications
- broad or unrelated refactors

## 3. Likely files to change

Expected changes should stay close to:
- `src/routes/index.ts`
- `src/modules/students/index.ts`
- new files inside `src/modules/students/`
- new file(s) inside `data/`

## 4. Acceptance criteria

- `GET /api/students` returns an array
- `POST /api/students` creates and persists a student in JSON
- invalid payloads are rejected clearly
- backend builds successfully
- code remains modular and reviewable

## 5. Risks and review points

- route file becoming too large
- validation and persistence mixed in the same file
- weak input validation
- duplication of student type declarations
- fragile file handling or missing file initialization

## 6. Final implementation prompt for Copilot Agent

Implement only the first backend slice for student management.

Project context:
- Node + TypeScript backend
- JSON persistence
- current server already boots successfully
- keep changes small and localized

Required scope for this iteration:
- create a modular student backend slice
- implement GET /api/students
- implement POST /api/students
- persist students in a JSON file under the data directory
- validate required fields: name, cpf, email
- return clear HTTP responses for invalid input

Constraints:
- do not implement update or delete
- do not touch frontend
- do not implement classes, assessments, or notifications
- do not refactor unrelated files
- do not place all logic in route files

Expected response format:
1. Objective
2. Files to change
3. Out of scope
4. Implementation summary
5. Manual validation steps
6. Risks or caveats