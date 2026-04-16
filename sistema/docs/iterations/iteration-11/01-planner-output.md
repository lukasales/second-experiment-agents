# Planner Output - Iteration 11

## 1. Iteration objective

Complete the basic classes backend CRUD by implementing update and delete flows.

## 2. Out of scope

Do not implement:
- frontend changes
- advanced enrollment workflows
- assessments business logic
- notifications
- unrelated backend refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/server/src/modules/classes/index.ts`
- `sistema/server/src/modules/classes/class.validation.ts`
- `sistema/server/src/modules/classes/class.repository.ts`
- `sistema/server/src/modules/classes/class.service.ts`

## 4. Acceptance criteria

- `PUT /api/classes/:id` updates an existing class
- `PUT /api/classes/:id` returns `404` if class does not exist
- `DELETE /api/classes/:id` deletes an existing class
- `DELETE /api/classes/:id` returns `404` if class does not exist
- `classes.json` reflects update and delete correctly
- backend builds successfully

## 5. Risks and review points

- validation logic duplicated outside the shared validator
- inconsistent not-found handling between update and delete
- accidental change to class shape
- overgrowth of route handlers

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-11/00-iteration-brief.md
- sistema/docs/iterations/iteration-11/01-planner-output.md
- sistema/server/src/modules/classes/index.ts
- sistema/server/src/modules/classes/class.validation.ts
- sistema/server/src/modules/classes/class.repository.ts
- sistema/server/src/modules/classes/class.service.ts
- sistema/server/src/shared/types/domain.ts
- sistema/server/data/classes.json

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.