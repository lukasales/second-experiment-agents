# Iteration 08 - Students frontend slice C

## Purpose

This iteration adds student editing to the frontend.

## Functional scope

Implement only:
- select an existing student from the students list
- load that student's data into the form
- update that student from the UI
- refresh the list after successful update
- show clear editing feedback

## Expected UI behavior

The students page must:
- let the user choose a student to edit
- populate the existing form with the selected student's data
- visually indicate when the page is in editing mode
- submit updates to the backend using the existing update endpoint
- refresh the list after successful update
- allow canceling edit mode and returning to create mode

## Explicitly out of scope

Do not implement:
- student deletion in the UI
- classes UI
- assessments UI
- notifications UI
- frontend tests
- broad UI refactors outside the students page

## Technical constraints

- reuse the current students page structure
- keep the current visual style
- keep the current frontend API helper approach
- avoid overengineering state management
- do not modify backend files
- keep the implementation localized

## Acceptance criteria

1. A student can be selected for editing from the list.
2. The form is populated with the selected student's data.
3. The UI clearly indicates edit mode.
4. Submitting the form in edit mode updates the student.
5. The list refreshes after successful update.
6. The user can cancel edit mode.
7. Existing create mode continues to work.
8. The frontend builds successfully.

## Expected risk points

- mixing create and edit logic in a confusing way
- poor edit-mode indication
- not resetting form state correctly after update or cancel
- duplicated API logic
- visual regressions in the current students page