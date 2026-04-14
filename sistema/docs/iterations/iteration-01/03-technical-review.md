# Technical Review - Iteration 01

## Review goal

Review the implementation of the first backend slice for student management.

## Planned scope being reviewed

- `GET /api/students`
- `POST /api/students`
- JSON persistence
- validation of `name`, `cpf`, `email`

## Review checklist

Evaluate:
- correctness
- modularity
- readability
- duplication
- maintainability
- coupling
- regression risk
- scope alignment

## Prompt to use with the reviewer agent

You are the Technical Reviewer agent for this project.

Review the implementation critically.

What to evaluate:
- correctness
- modularity
- readability
- duplication
- maintainability
- coupling
- regression risk
- scope alignment

Output format:
1. Summary verdict
2. Strengths
3. Problems found
4. Severity of each problem
5. Recommended fixes before acceptance
6. Whether this should be:
   - accepted
   - accepted partially
   - accepted with manual adjustment
   - rejected

Planned iteration:
Implement a small backend slice for student management with JSON persistence:
- GET /api/students
- POST /api/students

Out of scope:
- update student
- delete student
- frontend work
- acceptance tests
- class management
- assessment management
- notifications
- broad refactors

Actual implementation summary or important changes:
[TO BE REPLACED WITH THE REAL IMPLEMENTATION SUMMARY AFTER COPILOT CHANGES THE CODE]

## Usage note

After Copilot finishes, replace the placeholder block above with:
- changed files
- short description of what each file does
- any suspicious design decisions you noticed