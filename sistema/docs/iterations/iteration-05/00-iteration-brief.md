# Iteration 05 - Students frontend slice A

## Purpose

This iteration starts the students frontend integration.

## Functional scope

Implement only:
- fetch and display the students list from the backend
- create a student from the students page
- show basic loading, success, and error feedback

## Expected UI behavior

The students page must:
- load students from the backend API
- display the current students list
- provide a form with `name`, `cpf`, and `email`
- submit a new student to the backend
- refresh the list after successful creation
- display an error message for invalid payloads or conflicts

## Explicitly out of scope

Do not implement:
- student editing in the UI
- student deletion in the UI
- classes UI
- assessments UI
- notifications UI
- frontend tests
- broad UI refactors outside the students page

## Technical constraints

- keep the implementation localized to the students frontend slice
- use the current frontend structure
- avoid overengineering state management
- keep the page readable and simple
- do not redesign unrelated pages

## Acceptance criteria

1. The students page fetches and displays students from the backend.
2. A user can create a student from the UI.
3. The list refreshes after successful creation.
4. Duplicate or invalid submissions show an error message.
5. The frontend builds successfully.

## Expected risk points

- duplicated API logic placed directly in the page
- poor loading/error handling
- uncontrolled form state
- confusing refresh flow after create