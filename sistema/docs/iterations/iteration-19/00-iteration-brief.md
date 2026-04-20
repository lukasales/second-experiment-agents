# Iteration 19 - Assessments frontend correction: initial matrix and class states

## Purpose

This iteration corrects and completes the assessments frontend so a selected class can show a usable assessment matrix even when no assessment values have been saved yet.

## Functional scope

Implement only:
- support all main class states on the assessments page
- render an initial editable matrix for classes with enrolled students even when `assessmentsByStudent` is still empty
- keep the current one-cell update flow working
- preserve existing stored assessment data when it exists

## Required class states

The assessments page must handle these cases clearly:

1. no classes available
2. no class selected
3. selected class with no enrolled students
4. selected class with enrolled students but no saved assessments yet
5. selected class with enrolled students and existing saved assessments

## Expected matrix behavior

- the matrix must always show students in the first column for the selected class
- for a class with enrolled students but no saved assessments yet, the page must still show initial assessment columns
- use at least these base goals:
  - `Requirements`
  - `Tests`
- if the backend already contains additional stored goals for the selected class, include them as columns too
- the matrix must remain editable one cell at a time using the existing update flow
- valid concepts remain:
  - `MANA`
  - `MPA`
  - `MA`

## Expected UX behavior

- show a clear empty state when there are no classes
- show a clear empty state when no class is selected
- show a clear empty state when the selected class has no enrolled students
- do not show a “no goals yet” dead end for a class that already has enrolled students
- for classes with enrolled students, always show a usable matrix
- preserve the current visual style and app layout

## Explicitly out of scope

Do not implement:
- goal creation UI
- batch editing
- notifications UI
- email sending
- frontend tests
- backend changes
- broad UI refactors outside the assessments page

## Technical constraints

- keep the implementation localized
- reuse the current assessments page as the base
- do not change backend endpoints
- do not require manual backend seeding just to show the first usable matrix
- derive final columns from:
  - the base goals for first use
  - plus any additional stored goals already present in `assessmentsByStudent`

## Acceptance criteria

1. The page handles all main class states clearly.
2. A class with enrolled students but no saved assessments still shows a usable matrix.
3. The matrix still works for classes with existing saved assessments.
4. Student names remain resolved correctly.
5. Existing one-cell editing behavior continues to work.
6. Frontend build succeeds.

## Expected risk points

- losing compatibility with previously stored assessment goals
- showing inconsistent columns between empty and populated classes
- confusing state handling for classes without students
- breaking the current one-cell edit flow
- over-scoping into goal authoring or notifications