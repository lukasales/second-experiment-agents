# Technical Review - Iteration 02

## Summary verdict

The implementation successfully extends the students backend with duplicate checks and a working update endpoint. The planned scope was respected, the main behaviors are correct, and the students module is now better structured than in Iteration 01 thanks to the introduction of a service layer.

## Strengths

- The scope was respected.
- Duplicate CPF checks on create work correctly.
- Duplicate email checks on create work correctly.
- `PUT /api/students/:id` works for valid updates.
- `PUT /api/students/:id` returns `404` for missing students.
- `PUT /api/students/:id` returns `409` for CPF/email conflicts.
- Validation rules are shared instead of duplicated between create and update.
- A service layer was introduced, improving separation of concerns.
- Route handlers became thinner and clearer.

## Problems found

1. `student.repository.ts` still relies on `process.cwd()` to resolve the data file path.
2. The students route file is still named `index.ts`, which is acceptable now but may become less clear as the module grows.
3. Duplicate checking and persistence are not transactional, so concurrency would still be fragile.
4. There is still no delete endpoint, so the students backend is not yet a full CRUD.

## Severity

- Problem 1: Low
- Problem 2: Low
- Problem 3: Low
- Problem 4: Not a defect for this iteration, but still a pending project requirement

## Recommended fixes before acceptance

- Accept this iteration as implemented.
- Keep the current service-based structure.
- In the next student-management iteration:
  - implement `DELETE /api/students/:id`
  - consider renaming the route file if the module grows
  - improve data path handling in the repository

## Recommendation

Accepted