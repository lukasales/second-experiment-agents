# Planner Output - Iteration 13

## 1. Iteration objective

Extend the classes frontend by adding edit mode and delete actions for existing classes.

## 2. Out of scope

Do not implement:
- enrollment UI
- class detail UI
- assessments UI
- notifications UI
- frontend tests
- backend changes
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/ClassesPage.tsx`
- `sistema/client/src/config/classesApi.ts`
- `sistema/client/src/styles.css`

## 4. Acceptance criteria

- the user can select a class for editing
- the form is populated with that class data
- the UI clearly indicates edit mode
- submitting in edit mode updates the class
- the user can delete a class from the list
- deleting the currently edited class exits edit mode correctly
- canceling edit mode restores create mode
- create mode still works
- frontend builds successfully

## 5. Risks and review points

- create/edit/delete logic becoming tangled
- selected class state not being reset correctly
- weak edit-mode visual feedback
- delete action not being visually distinct
- duplicated request logic between create, update, and delete
- layout regressions in the classes page

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-13/00-iteration-brief.md
- sistema/docs/iterations/iteration-13/01-planner-output.md
- sistema/client/src/pages/ClassesPage.tsx
- sistema/client/src/config/classesApi.ts
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