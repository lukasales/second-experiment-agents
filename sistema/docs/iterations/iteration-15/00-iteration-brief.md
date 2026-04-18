# Iteration 15 - Classes frontend slice C

## Purpose

This iteration completes the missing student enrollment flow in the classes frontend.

## Functional scope

Implement only:
- load the available students into the classes page
- allow selecting enrolled students when creating a class
- allow editing enrolled students when updating a class
- persist the selected student ids through the existing classes backend
- refresh the classes list after create/update

## Expected UI behavior

The classes page must:
- fetch the available students from the backend
- display a simple student selection UI inside the class form
- allow multiple students to be selected
- show the selected student count
- include the selected `studentIds` in create mode
- preserve and update `studentIds` in edit mode
- keep create/edit behavior working correctly
- keep the current visual style and layout

## Explicitly out of scope

Do not implement:
- assessments frontend
- notifications UI
- class detail page
- frontend tests
- backend changes
- broad refactors outside the classes page

## Technical constraints

- keep the implementation localized
- reuse the current classes page and classes API helper
- reuse the existing students backend as the source of available students
- do not redesign unrelated pages
- keep the current create/edit/delete classes flow working

## Acceptance criteria

1. The classes page loads the available students.
2. A user can select multiple students when creating a class.
3. The selected student ids are sent in the create payload.
4. A user can edit the enrolled students of an existing class.
5. The selected student ids are preserved and updated in edit mode.
6. The classes list refreshes after successful create/update.
7. The frontend builds successfully.

## Expected risk points

- mismatching student ids and displayed student names
- breaking the existing classes create/edit flow
- overcomplicating the student selection UI
- forgetting to preserve selected students in edit mode
- styling regressions in the classes page