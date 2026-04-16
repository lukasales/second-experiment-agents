# Planner Output - Iteration 10

## 1. Iteration objective

Start the classes backend by implementing list and create flows with JSON persistence.

## 2. Out of scope

Do not implement:
- update class
- delete class
- full enrollment flows
- assessments logic
- notifications
- frontend changes
- unrelated backend refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/server/src/modules/classes/index.ts`
- `sistema/server/src/modules/classes/` new helper files as needed
- `sistema/server/src/routes/index.ts`
- `sistema/server/src/shared/types/domain.ts`
- `sistema/server/data/classes.json`

## 4. Acceptance criteria

- `GET /api/classes` returns the persisted classes list
- `POST /api/classes` creates a class successfully
- invalid class payload returns `400`
- classes are persisted to JSON
- backend builds successfully
- logic remains reasonably modular

## 5. Risks and review points

- class model inconsistency
- validation logic duplicated across layers
- overgrowth of route file
- accidental drift into enrollment or assessments scope
- persistence path issues similar to earlier slices

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-10/00-iteration-brief.md
- sistema/docs/iterations/iteration-10/01-planner-output.md
- sistema/server/src/modules/classes/index.ts
- sistema/server/src/routes/index.ts
- sistema/server/src/shared/types/domain.ts
- sistema/server/data/README.md

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.