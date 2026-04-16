# Iteration 13 - Classes frontend slice B

## Purpose

This iteration completes the basic classes frontend flow by adding edit and delete actions.

## Functional scope

Implement only:
- select an existing class from the list
- load class data into the existing form
- update a class from the UI
- delete a class from the UI
- refresh the list after successful update or delete
- show clear edit/delete feedback

## Expected UI behavior

The classes page must:
- let the user choose a class to edit
- populate the current form with the selected class data
- visually indicate when the page is in editing mode
- submit updates through the existing backend update endpoint
- provide a delete action for each class in the list
- if the deleted class is currently being edited, exit edit mode and reset the form
- allow canceling edit mode and returning to create mode
- preserve the current visual style and layout

## Explicitly out of scope

Do not implement:
- enrollment UI
- class detail UI
- assessments UI
- notifications UI
- frontend tests
- broad UI refactors outside the classes page
- backend changes

## Technical constraints

- reuse the current classes page structure
- reuse the current form for both create and edit flows
- keep the current visual style
- keep the current frontend API helper approach
- avoid overengineering state management
- keep the implementation localized

## Acceptance criteria

1. A class can be selected for editing from the list.
2. The form is populated with the selected class data.
3. The UI clearly indicates edit mode.
4. Submitting the form in edit mode updates the class.
5. A class can be deleted from the list.
6. Deleting the currently edited class exits edit mode and resets the form.
7. Canceling edit mode restores create mode.
8. Existing create mode continues to work.
9. The frontend builds successfully.

## Expected risk points

- mixing create/edit/delete logic in a confusing way
- weak visual distinction between edit and delete actions
- not resetting form state correctly after update, delete, or cancel
- duplicated API logic
- visual regressions in the current classes page