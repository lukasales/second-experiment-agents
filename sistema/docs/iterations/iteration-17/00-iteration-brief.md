# Iteration 17 - Assessments frontend slice A

## Purpose

This iteration starts the frontend implementation of assessments by loading and displaying the current assessment matrix for one selected class.

## Functional scope

Implement only:
- load the available classes on the assessments page
- allow selecting one class
- load the current assessment data for the selected class from the backend
- load students data needed to resolve student ids to student names
- render a read-only assessment matrix for the selected class

## Expected UI behavior

The assessments page must:
- fetch the available classes
- let the user choose one class
- call `GET /api/assessments/class/:classId` for the selected class
- resolve the class student ids to the student names using the existing students source
- display a matrix where:
  - rows are students
  - columns are goals currently present in `assessmentsByStudent`
  - cells show the current concept value
- show a clear empty state when:
  - there are no classes
  - no class is selected
  - the selected class has no recorded assessment goals yet
- keep the current visual style and app layout

## Explicitly out of scope

Do not implement:
- editing assessment cells
- creating new goals
- notifications UI
- frontend tests
- backend changes
- broad UI refactors outside the assessments page

## Technical constraints

- keep the implementation localized
- reuse existing backend endpoints
- reuse current API helper style
- do not redesign unrelated pages
- do not invent a larger assessment model in the frontend
- derive goals from the current `assessmentsByStudent` data already returned by the backend

## Acceptance criteria

1. The assessments page loads available classes.
2. The user can select one class.
3. The page loads the assessment data for the selected class.
4. Student ids are resolved to student names in the rendered matrix.
5. The matrix displays current goals and concepts for the selected class.
6. Clear empty states are shown when there is no class data or no assessment goals yet.
7. The frontend builds successfully.

## Expected risk points

- failing to map student ids to student names correctly
- deriving matrix columns inconsistently from `assessmentsByStudent`
- overcomplicating the first assessments UI
- breaking the current layout/style
- coupling the page too tightly to assumptions about future editing behavior