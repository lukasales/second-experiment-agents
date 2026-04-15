# Iteration 03 - Students backend slice C

## Purpose

This iteration completes the students backend CRUD by adding student deletion.

## Functional scope

Implement only:
- `DELETE /api/students/:id`

## Expected delete behavior

`DELETE /api/students/:id` must:
- delete an existing student
- return `204` on successful deletion
- return `404` if the student does not exist

## Explicitly out of scope

Do not implement:
- frontend integration
- classes
- assessments
- notifications
- acceptance tests
- broad refactors outside the students backend slice

## Technical constraints

- keep the implementation modular
- reuse the current students service/repository structure
- do not move unrelated files
- keep route handlers thin

## Acceptance criteria

1. `DELETE /api/students/:id` deletes an existing student.
2. Successful deletion returns `204`.
3. Deleting a missing student returns `404`.
4. `students.json` reflects the deletion correctly.
5. `npm run build` succeeds.

## Expected risk points

- delete logic implemented directly in routes
- inconsistent status code handling
- persistence update not written correctly
- deleting the wrong record due to id matching mistakes