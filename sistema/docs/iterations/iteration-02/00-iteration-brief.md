# Iteration 02 - Students backend slice B

## Purpose

This iteration extends the students backend after the initial list/create slice.

The goal is to improve data integrity and support student updates.

## Functional scope

Implement only:
- duplicate checks for student creation
- `PUT /api/students/:id`

## Expected duplicate rules

When creating a student:
- reject duplicated CPF
- reject duplicated email

When updating a student:
- reject duplicated CPF if it belongs to another student
- reject duplicated email if it belongs to another student

## Expected update behavior

`PUT /api/students/:id` must:
- validate `name`, `cpf`, and `email`
- update an existing student
- return `404` if the student does not exist
- return `409` for duplicate CPF/email conflicts
- return a clear `400` for invalid payloads

## Explicitly out of scope

Do not implement:
- `DELETE /api/students/:id`
- frontend integration
- classes
- assessments
- notifications
- acceptance tests
- broad refactors outside the students backend slice

## Technical constraints

- keep the implementation modular
- do not place growing business rules only in the route file
- this iteration is allowed to introduce a service layer if needed
- keep changes localized to the students backend slice

## Acceptance criteria

1. `POST /api/students` rejects duplicate CPF.
2. `POST /api/students` rejects duplicate email.
3. `PUT /api/students/:id` updates a student successfully.
4. `PUT /api/students/:id` returns `404` for missing student.
5. `PUT /api/students/:id` returns `409` for CPF/email conflicts.
6. `npm run build` succeeds.

## Expected risk points

- duplicate checks implemented only in routes
- update validation becoming mixed with persistence logic
- conflict detection not excluding the current student id
- overgrowth of `students/index.ts`