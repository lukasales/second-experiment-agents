# Planner Output - Iteration 12

## 1. Iteration objective

Start the classes frontend integration by:
- listing classes from the backend
- creating classes from the UI
- refreshing the list after creation

## 2. Out of scope

Do not implement:
- class edit UI
- class delete UI
- enrollment UI
- class detail UI
- assessments UI
- notifications UI
- frontend tests
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/ClassesPage.tsx`
- `sistema/client/src/config/api.ts`
- possibly a new helper under `sistema/client/src/config/`
- `sistema/client/src/styles.css`

## 4. Acceptance criteria

- classes page fetches and displays data from the backend
- users can create a class from the page
- successful creation refreshes the list
- invalid payloads show an error message
- frontend builds successfully

## 5. Risks and review points

- API calls implemented messily inside the page
- duplicated fetch logic
- poor error-state handling
- form submission building the wrong payload shape
- visual inconsistency with the existing students UI

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-12/00-iteration-brief.md
- sistema/docs/iterations/iteration-12/01-planner-output.md
- sistema/client/src/pages/ClassesPage.tsx
- sistema/client/src/config/api.ts
- sistema/client/src/router.tsx
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