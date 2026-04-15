# Technical Review - Iteration 01

## Summary verdict

The implementation meets the planned scope and is acceptable for this first backend slice. The student listing and creation endpoints work, payload validation is in place, and JSON persistence is implemented.

## Strengths

- Scope is respected: `GET /api/students` and `POST /api/students` are implemented.
- Route wiring is simple and clear.
- Persistence is separated from route handling in `student.repository.ts`.
- Payload validation checks `name`, `cpf`, and `email`.
- Invalid payloads return `400`.
- The backend is stable enough for this iteration.

## Problems found

1. Route logic remains in `modules/students/index.ts` instead of a dedicated route/service separation.
2. No service layer exists yet, so business logic is still coupled to routing.
3. Duplicate CPF and email values are not checked, allowing duplicate student records.
4. `student.repository.ts` uses `process.cwd()` to resolve `data/students.json`, which is fragile if the server launches from a different working directory.
5. The validation file required a manual semantic cleanup after implementation.

## Severity

- Problem 1: Low
- Problem 2: Low
- Problem 3: Low for this iteration, Medium for the next one
- Problem 4: Low
- Problem 5: Medium

## Recommended fixes before acceptance

- Accept this iteration with manual adjustment.
- Keep the current structure for now.
- In the next student-management iteration:
  - add duplicate CPF/email validation,
  - consider extracting a service layer,
  - avoid `process.cwd()` in repository file resolution.

## Recommendation

Accepted with manual adjustment