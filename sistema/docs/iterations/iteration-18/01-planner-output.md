# Planner Output - Iteration 18

## 1. Iteration objective

Extend the assessments frontend by enabling one-cell assessment updates through the existing backend endpoint.

## 2. Out of scope

Do not implement:
- goal creation
- batch editing
- clearing/removing concepts
- notifications UI
- frontend tests
- backend changes
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/AssessmentsPage.tsx`
- `sistema/client/src/config/assessmentsApi.ts`
- `sistema/client/src/styles.css`
- `sistema/client/src/types/domain.ts` only if minimally necessary

## 4. Acceptance criteria

- the current assessments matrix still loads correctly
- one cell can be updated at a time
- the page sends the correct payload to `PUT /api/assessments`
- only `MANA`, `MPA`, and `MA` are available as selectable concepts
- the matrix reflects the updated value after success
- saving, success, and error feedback are visible
- frontend build succeeds

## 5. Risks and review points

- wrong mapping between cell and payload fields
- inconsistent local matrix update after save
- too much page-level state for a simple edit interaction
- accidental drift into batch editing or goal authoring
- style regressions in the matrix layout

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-18/00-iteration-brief.md
- sistema/docs/iterations/iteration-18/01-planner-output.md
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