# Planner Output - Iteration 15

## 1. Iteration objective

Extend the classes frontend by adding student enrollment selection in create and edit flows.

## 2. Out of scope

Do not implement:
- assessments frontend
- notifications UI
- class detail page
- frontend tests
- backend changes
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/ClassesPage.tsx`
- `sistema/client/src/config/classesApi.ts`
- possibly a small helper to fetch students if needed
- `sistema/client/src/styles.css`
- `sistema/client/src/types/domain.ts` only if minimally necessary

## 4. Acceptance criteria

- the classes page loads available students
- multiple students can be selected in create mode
- selected student ids are sent in the create payload
- enrolled students can be edited
- selected student ids are preserved in edit mode
- classes list refreshes after successful create/update
- frontend builds successfully

## 5. Risks and review points

- student selection UI becoming more complex than needed
- create/edit flow regression
- selected ids not preserved correctly
- inconsistent displayed names versus stored ids
- page-level state becoming harder to reason about

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-15/00-iteration-brief.md
- sistema/docs/iterations/iteration-15/01-planner-output.md
- sistema/client/src/pages/ClassesPage.tsx
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