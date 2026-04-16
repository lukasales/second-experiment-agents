# Iteration 12 - Classes frontend slice A

## Purpose

This iteration starts the classes frontend integration.

## Functional scope

Implement only:
- fetch and display the classes list from the backend
- create a class from the classes page
- refresh the list after successful creation
- show basic loading, success, and error feedback

## Expected UI behavior

The classes page must:
- load classes from the backend API
- display the current classes list
- provide a form with `topic`, `year`, and `semester`
- submit a new class to the backend
- send `studentIds: []` and `assessmentsByStudent: {}` automatically
- refresh the list after successful creation
- display an error message for invalid payloads

## Explicitly out of scope

Do not implement:
- class edit UI
- class delete UI
- enrollment UI
- class detail UI
- assessments UI
- notifications UI
- frontend tests
- broad UI refactors outside the classes page

## Technical constraints

- keep the implementation localized to the classes frontend slice
- use the current frontend structure
- avoid overengineering state management
- keep the page readable and simple
- do not redesign unrelated pages
- do not modify backend files

## Acceptance criteria

1. The classes page fetches and displays classes from the backend.
2. A user can create a class from the UI.
3. The list refreshes after successful creation.
4. Invalid submissions show an error message.
5. The frontend builds successfully.

## Expected risk points

- duplicated API logic placed directly in the page
- poor loading/error handling
- uncontrolled form state
- confusing payload construction for `studentIds` and `assessmentsByStudent`
- visual inconsistency with the existing students page