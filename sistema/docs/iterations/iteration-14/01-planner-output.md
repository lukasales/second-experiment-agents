# Planner Output - Iteration 14

## 1. Iteration objective

Start the assessments backend by:
- reading assessment data for one class
- updating one assessment entry for one student and one goal
- persisting that update in the existing classes JSON structure

## 2. Out of scope

Do not implement:
- assessments frontend
- batch updates
- notifications or email sending
- analytics/reporting
- unrelated backend refactors
- frontend changes

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/server/src/modules/assessments/index.ts`
- `sistema/server/src/modules/assessments/` new helper files as needed
- `sistema/server/src/routes/index.ts`
- `sistema/server/src/shared/types/domain.ts`
- `sistema/server/data/classes.json`

## 4. Acceptance criteria

- `GET /api/assessments/class/:classId` returns assessment data for an existing class
- `GET /api/assessments/class/:classId` returns `404` for missing class
- `PUT /api/assessments` updates one assessment entry successfully
- invalid payload returns `400`
- missing class returns `404`
- non-enrolled student returns `400`
- `classes.json` reflects the persisted update
- backend builds successfully

## 5. Risks and review points

- assessment model becoming too ambitious for the first slice
- route handlers accumulating business logic
- weak validation for `goal` or `concept`
- inconsistency with existing class persistence
- accidental overlap with notification behavior

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-14/00-iteration-brief.md
- sistema/docs/iterations/iteration-14/01-planner-output.md
- sistema/server/src/modules/assessments/index.ts
- sistema/server/src/routes/index.ts
- sistema/server/src/shared/types/domain.ts
- sistema/server/src/modules/classes/class.repository.ts
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