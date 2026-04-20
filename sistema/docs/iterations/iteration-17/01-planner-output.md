# Planner Output - Iteration 17

## 1. Iteration objective

Start the assessments frontend by loading one selected class and rendering a read-only assessment matrix from the current backend data.

## 2. Out of scope

Do not implement:
- assessment editing
- creating new goals
- notifications UI
- frontend tests
- backend changes
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/AssessmentsPage.tsx`
- `sistema/client/src/config/assessmentsApi.ts`
- `sistema/client/src/config/classesApi.ts` only if minimally necessary
- `sistema/client/src/config/studentsApi.ts` only if minimally necessary
- `sistema/client/src/styles.css`
- `sistema/client/src/types/domain.ts` only if minimally necessary

## 4. Acceptance criteria

- available classes are loaded on the assessments page
- one class can be selected
- the page loads current assessment data for the selected class
- student ids are resolved to student names
- the matrix displays goals and concepts for the selected class
- empty states are shown clearly when no goals exist yet
- frontend build succeeds

## 5. Risks and review points

- incorrect student-id to student-name mapping
- unstable matrix columns if goals are derived inconsistently
- page state growing too much too early
- introducing assumptions that block the next editing iteration
- style drift from the current UI

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-17/00-iteration-brief.md
- sistema/docs/iterations/iteration-17/01-planner-output.md
- sistema/client/src/pages/AssessmentsPage.tsx
- sistema/client/src/config/classesApi.ts
- sistema/client/src/config/studentsApi.ts
- sistema/client/src/styles.css
- sistema/client/src/types/domain.ts

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.