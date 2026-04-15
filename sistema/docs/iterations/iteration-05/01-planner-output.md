# Planner Output - Iteration 05

## 1. Iteration objective

Start the students frontend integration by:
- listing students from the backend
- creating students from the UI
- refreshing the list after creation

## 2. Out of scope

Do not implement:
- frontend edit flow
- frontend delete flow
- classes UI
- assessments UI
- notifications UI
- frontend tests
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/StudentsPage.tsx`
- `sistema/client/src/config/api.ts`
- possibly new helper files under `sistema/client/src/`

## 4. Acceptance criteria

- students page fetches and displays data from the backend
- users can create a student from the page
- successful creation refreshes the list
- invalid or duplicate payloads show an error message
- frontend builds successfully

## 5. Risks and review points

- API calls implemented directly in a messy way inside the page
- duplicated fetch logic
- poor error-state handling
- form submission without refresh or feedback
- page growing too much without simple local helpers

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-05/00-iteration-brief.md
- sistema/docs/iterations/iteration-05/01-planner-output.md
- sistema/client/src/pages/StudentsPage.tsx
- sistema/client/src/config/api.ts
- sistema/client/src/types/domain.ts
- sistema/client/src/router.tsx
- sistema/client/src/styles.css

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.