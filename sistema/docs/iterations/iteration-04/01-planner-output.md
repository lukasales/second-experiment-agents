# Planner Output - Iteration 04

## 1. Iteration objective

Introduce acceptance scenarios for the students backend using Gherkin/Cucumber.

## 2. Out of scope

Do not implement:
- frontend tests
- classes tests
- assessments tests
- notifications tests
- Cypress
- unrelated backend refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/features/`
- `sistema/server/package.json`
- backend Cucumber support files under `sistema/server/`

## 4. Acceptance criteria

- Cucumber is installed and configured
- students backend feature file exists
- step definitions exist
- the scenarios cover list/create/duplicate/update/delete
- a test command is available and documented

## 5. Risks and review points

- flaky scenarios caused by shared JSON state
- poor reset strategy between scenarios
- step definitions too tightly coupled to exact response strings
- too much tooling complexity for a small test layer

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-04/00-iteration-brief.md
- sistema/docs/iterations/iteration-04/01-planner-output.md
- sistema/server/package.json
- sistema/server/src/modules/students/index.ts
- sistema/server/src/modules/students/student.service.ts
- sistema/server/src/modules/students/student.repository.ts
- sistema/server/data/students.json

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.