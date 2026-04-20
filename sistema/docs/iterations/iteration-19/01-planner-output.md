# Planner Output - Iteration 19

## 1. Iteration objective

Correct and complete the assessments frontend so the selected class always shows a usable matrix when it has enrolled students, even before any assessment values have been stored.

## 2. Out of scope

Do not implement:
- goal creation UI
- batch editing
- notifications UI
- email sending
- frontend tests
- backend changes
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/AssessmentsPage.tsx`
- `sistema/client/src/styles.css`
- `sistema/client/src/types/domain.ts` only if minimally necessary
- `sistema/client/src/config/assessmentsApi.ts` only if minimally necessary

## 4. Acceptance criteria

- no classes state is handled clearly
- no selected class state is handled clearly
- selected class with no students is handled clearly
- selected class with students but no saved assessments still shows a usable matrix
- the matrix still works for classes with saved assessments
- base goals `Requirements` and `Tests` are shown for first use
- any additional stored goals are preserved and shown too
- one-cell editing still works
- frontend build succeeds

## 5. Risks and review points

- mixing base goals and stored goals inconsistently
- accidentally hiding students when no assessments exist yet
- breaking the currently working one-cell update flow
- introducing assumptions that belong to future goal-management iterations
- style regressions in the table and state views

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-19/00-iteration-brief.md
- sistema/docs/iterations/iteration-19/01-planner-output.md
- sistema/client/src/pages/AssessmentsPage.tsx
- sistema/client/src/config/assessmentsApi.ts
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