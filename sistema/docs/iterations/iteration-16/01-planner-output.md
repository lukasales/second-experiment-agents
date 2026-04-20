# Planner Output - Iteration 16

## 1. Iteration objective

Add backend acceptance tests for the implemented classes and assessments flows using Gherkin/Cucumber.

## 2. Out of scope

Do not implement:
- frontend tests
- notification tests
- email tests
- Cypress/browser E2E
- unrelated backend refactors
- new product features outside test support

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/features/` new feature file(s)
- `sistema/server/features/step_definitions/` new or extended step files
- `sistema/server/features/support/hooks.js`
- `sistema/server/package.json` only if a minimal script adjustment is needed
- `README.md` only if the test command documentation needs a small update

## 4. Acceptance criteria

- classes backend scenarios exist and pass
- assessments backend scenarios exist and pass
- scenarios run through the current server-side Cucumber setup
- deterministic JSON reset exists for students/classes data
- `npm run test:acceptance` succeeds
- `npm run build` succeeds

## 5. Risks and review points

- state leakage between scenarios
- brittle assertions against exact full error messages
- duplicated HTTP request helpers in step definitions
- overgrowth of hooks beyond what is needed
- hidden dependency on local manual data

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-16/00-iteration-brief.md
- sistema/docs/iterations/iteration-16/01-planner-output.md
- sistema/features/
- sistema/server/features/support/hooks.js
- sistema/server/features/step_definitions/
- sistema/server/package.json
- README.md

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.