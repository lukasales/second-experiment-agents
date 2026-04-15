# Planner Output - Iteration 03

## 1. Iteration objective

Extend the students backend slice to implement:
- `DELETE /api/students/:id`

## 2. Out of scope

Do not implement:
- frontend work
- classes
- assessments
- notifications
- acceptance tests
- unrelated refactors

## 3. Likely files to change

Expected changes should stay close to:
- `src/modules/students/index.ts`
- `src/modules/students/student.repository.ts`
- `src/modules/students/student.service.ts`

## 4. Acceptance criteria

- `DELETE /api/students/:id` deletes an existing student
- successful deletion returns `204`
- deleting a missing student returns `404`
- `students.json` reflects the deletion
- backend builds successfully
- logic stays modular

## 5. Risks and review points

- delete logic being implemented directly in the route file
- missing service-layer handling
- wrong status code on success
- wrong student selected for deletion
- persistence file not updated properly

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-03/00-iteration-brief.md
- sistema/docs/iterations/iteration-03/01-planner-output.md
- sistema/server/src/routes/index.ts
- sistema/server/src/modules/students/index.ts
- sistema/server/src/modules/students/student.repository.ts
- sistema/server/src/modules/students/student.service.ts
- sistema/server/src/modules/students/student.validation.ts
- sistema/server/src/shared/types/domain.ts

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.