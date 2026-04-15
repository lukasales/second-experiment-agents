# Planner Output - Iteration 02

## 1. Iteration objective

Extend the students backend slice to:
- reject duplicate CPF/email on create
- implement `PUT /api/students/:id`

## 2. Out of scope

Do not implement:
- delete student
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
- `src/modules/students/student.validation.ts`
- possibly a new `src/modules/students/student.service.ts`

## 4. Acceptance criteria

- duplicate CPF is rejected on create
- duplicate email is rejected on create
- `PUT /api/students/:id` updates a student
- update returns `404` when student does not exist
- update returns `409` on duplicate CPF/email conflict
- backend builds successfully
- logic stays reasonably modular

## 5. Risks and review points

- duplicate-check logic being duplicated between create and update
- update rules implemented directly in the route file
- missing conflict exclusion for the current student id
- students module growing without a service layer
- inconsistent HTTP status usage

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-02/00-iteration-brief.md
- sistema/docs/iterations/iteration-02/01-planner-output.md
- sistema/server/src/routes/index.ts
- sistema/server/src/modules/students/index.ts
- sistema/server/src/modules/students/student.repository.ts
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