# Planner Output - Iteration 08

## 1. Iteration objective

Extend the students frontend by adding edit mode for existing students.

## 2. Out of scope

Do not implement:
- delete UI
- classes UI
- assessments UI
- notifications UI
- frontend tests
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/StudentsPage.tsx`
- `sistema/client/src/config/studentsApi.ts`
- `sistema/client/src/styles.css`

## 4. Acceptance criteria

- the user can select a student for editing
- the form is populated with that student's data
- the UI clearly indicates edit mode
- submitting in edit mode updates the student
- canceling edit mode restores create mode
- create mode still works
- frontend builds successfully

## 5. Risks and review points

- create/edit logic becoming tangled
- selected student state not being reset correctly
- weak edit-mode visual feedback
- duplicated request logic between create and update
- layout regressions in the students page

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-08/00-iteration-brief.md
- sistema/docs/iterations/iteration-08/01-planner-output.md
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