# Iteration 09 - Students frontend slice D

## Purpose

This iteration adds student deletion to the frontend.

## Functional scope

Implement only:
- delete a student from the students list
- refresh the list after successful deletion
- show clear deletion feedback
- keep create and edit flows working correctly after delete

## Expected UI behavior

The students page must:
- provide a delete action for each student in the list
- remove the student from the UI after successful deletion
- show success or error feedback for deletion
- if the deleted student was currently being edited, exit edit mode and reset the form
- preserve the current visual style and layout

## Explicitly out of scope

Do not implement:
- modal dialogs or advanced confirmation flows
- classes UI
- assessments UI
- notifications UI
- frontend tests
- backend changes
- broad refactors outside the students page

## Technical constraints

- keep the implementation localized to the students frontend slice
- reuse the current students page structure
- reuse the current frontend API helper approach
- keep state management simple
- do not add external UI libraries

## Acceptance criteria

1. A student can be deleted from the list in the UI.
2. The list refreshes after successful deletion.
3. Deletion shows clear feedback.
4. If the deleted student was in edit mode, the page exits edit mode correctly.
5. Existing create and edit flows continue to work.
6. The frontend builds successfully.

## Expected risk points

- create/edit/delete logic becoming tangled
- stale edit mode after deletion
- poor visual distinction between edit and delete actions
- accidental visual regressions in the students list