# Planner Output - Iteration 09

## 1. Iteration objective

Extend the students frontend by adding delete actions to the students list.

## 2. Out of scope

Do not implement:
- modal confirmation flows
- classes UI
- assessments UI
- notifications UI
- frontend tests
- backend changes
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/StudentsPage.tsx`
- `sistema/client/src/config/studentsApi.ts`
- `sistema/client/src/styles.css`

## 4. Acceptance criteria

- the user can delete a student from the list
- the list refreshes after deletion
- deletion shows clear feedback
- deleting the currently edited student exits edit mode and resets the form
- create and edit flows still work
- frontend builds successfully

## 5. Risks and review points

- delete logic making the page state confusing
- edit mode not resetting correctly after deletion
- visual confusion between edit and delete actions
- duplicated request logic in the API helper
- layout regressions in the students list

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-09/00-iteration-brief.md
- sistema/docs/iterations/iteration-09/01-planner-output.md
- sistema/client/src/pages/StudentsPage.tsx
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