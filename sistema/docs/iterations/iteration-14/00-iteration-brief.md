# Iteration 14 - Assessments backend slice A

## Purpose

This iteration starts the backend implementation of assessments.

## Functional scope

Implement only:
- `GET /api/assessments/class/:classId`
- `PUT /api/assessments`

## Expected backend behavior

- `GET /api/assessments/class/:classId` returns the current assessment data for one class
- `GET /api/assessments/class/:classId` returns `404` if the class does not exist
- `PUT /api/assessments` updates one assessment entry for one student and one goal inside one class
- updated assessment data is persisted in `classes.json`
- invalid payload returns `400`
- missing class returns `404`

## Expected update payload

The update payload must include:
- `classId`
- `studentId`
- `goal`
- `concept`

Where:
- `goal` is a non-empty string
- `concept` must be one of:
  - `MANA`
  - `MPA`
  - `MA`

## Expected persistence model

Assessment data must be stored inside each class record under:
- `assessmentsByStudent`

A simple structure is sufficient for this iteration, such as:

```json
{
  "student-id": {
    "Requirements": "MPA",
    "Tests": "MA"
  }
}
```

## Validation expectations

- reject invalid `concept`
- reject empty `goal`
- reject missing required fields
- reject updates for classes that do not exist
- reject updates for students not enrolled in the class

## Explicitly out of scope

Do not implement:
- assessments frontend
- batch updates
- notifications/email sending
- advanced assessment analytics
- broad backend refactors
- frontend changes

## Technical constraints

- keep the implementation modular
- keep route handlers thin
- keep persistence localized to the assessments backend slice
- do not introduce a separate persistence file if existing class persistence is enough
- do not modify unrelated modules unless strictly necessary

## Acceptance criteria

1. `GET /api/assessments/class/:classId` works for an existing class.
2. `GET /api/assessments/class/:classId` returns `404` for a missing class.
3. `PUT /api/assessments` updates one assessment entry successfully.
4. `PUT /api/assessments` returns `400` for invalid payload.
5. `PUT /api/assessments` returns `404` for missing class.
6. `PUT /api/assessments` returns `400` if the student is not enrolled in the class.
7. `classes.json` reflects the persisted assessment update.
8. `npm run build` succeeds.

## Expected risk points

- accidentally over-scoping into notifications
- inventing a larger assessment model than needed
- not validating concept values strictly
- persistence logic leaking into routes
- drifting away from the current class structure