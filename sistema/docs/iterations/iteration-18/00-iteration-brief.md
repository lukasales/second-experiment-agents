# Iteration 18 - Assessments frontend slice B

## Purpose

This iteration adds the first editable assessment interaction to the frontend by allowing one matrix cell to be updated at a time.

## Functional scope

Implement only:
- enable editing one assessment cell at a time in the current assessments matrix
- persist one cell update through `PUT /api/assessments`
- refresh or update the matrix after a successful save
- show clear saving, success, and error feedback for cell updates

## Expected UI behavior

The assessments page must:
- keep the current class selection flow from the previous iteration
- keep loading the current matrix from the backend
- allow the user to change one cell value for one student and one goal
- allow only the valid concepts:
  - `MANA`
  - `MPA`
  - `MA`
- send the update payload with:
  - `classId`
  - `studentId`
  - `goal`
  - `concept`
- show a saving state while one cell update is in progress
- prevent conflicting repeated updates while a cell is being saved
- reflect the updated concept in the matrix after success
- keep the current visual style and layout

## Explicitly out of scope

Do not implement:
- creation of new goals
- batch editing
- clearing/removing an assessment concept
- notifications UI
- frontend tests
- backend changes
- broad UI refactors outside the assessments page

## Technical constraints

- keep the implementation localized
- reuse the current assessments page and its existing read-only matrix as the base
- extend the assessments API helper with the `PUT /api/assessments` call
- do not redesign unrelated pages
- do not invent a larger editing workflow than needed
- keep this iteration limited to one-cell updates only

## Acceptance criteria

1. The assessments matrix remains visible for the selected class.
2. A user can change one cell concept value.
3. The page sends the correct payload to `PUT /api/assessments`.
4. Only valid concepts are available in the UI.
5. The matrix reflects the saved value after a successful update.
6. Clear saving/success/error feedback is shown.
7. The frontend builds successfully.

## Expected risk points

- updating the wrong student or wrong goal from a cell
- allowing conflicting edits while one save is still pending
- overcomplicating the editing UX
- breaking the read-only matrix already working
- adding assumptions that belong to future bulk-editing iterations