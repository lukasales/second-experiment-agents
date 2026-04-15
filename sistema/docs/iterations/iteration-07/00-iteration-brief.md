# Iteration 07 - Students backend CPF validation hardening

## Purpose

This iteration hardens backend validation for student CPF values.

## Functional scope

Implement only:
- backend CPF validation in the shared student payload validator
- enforce the rule for both student creation and student update

## Expected CPF rule

CPF must:
- contain digits only
- contain exactly 11 digits

## Expected backend behavior

For invalid CPF payloads:
- `POST /api/students` must return `400`
- `PUT /api/students/:id` must return `400`

The error payload should remain clear and consistent with the current validation style.

## Explicitly out of scope

Do not implement:
- frontend changes
- CPF mask formatting
- richer CPF business validation beyond numeric-only + 11 digits
- classes
- assessments
- notifications
- broad backend refactors

## Technical constraints

- keep validation centralized in the shared student payload validator
- do not duplicate CPF logic between create and update
- keep route handlers thin
- keep the current service/repository structure

## Acceptance criteria

1. `POST /api/students` rejects CPF containing non-digit characters.
2. `POST /api/students` rejects CPF with length different from 11.
3. `PUT /api/students/:id` rejects CPF containing non-digit characters.
4. `PUT /api/students/:id` rejects CPF with length different from 11.
5. Valid 11-digit numeric CPF still works normally.
6. `npm run build` succeeds.

## Expected risk points

- duplicate validation logic in multiple layers
- breaking existing valid create/update flows
- inconsistent error messages or field mapping
- over-scoping the iteration into broader validation redesign