# Technical Review - Iteration 04

## Summary verdict

The implementation successfully introduced acceptance scenarios for the students backend using a minimal and readable Cucumber setup. The scope was respected, the scenarios cover the core backend flow, and the reset strategy addresses the main risk of flaky JSON-based tests.

## Strengths

- The scope was respected.
- Cucumber was added with a minimal setup.
- The students backend feature file covers the main CRUD flow and duplicate checks.
- Step definitions are written in JavaScript, keeping setup simple.
- Assertions rely on status codes, key error fields, and response shape instead of brittle full-message matching.
- The reset strategy is deterministic before each scenario.
- The original `students.json` content is restored after the suite completes.
- The command to run the tests was documented in `README.md`.

## Problems found

1. The test suite depends on a separately running backend process.
2. The reset strategy is file-based and therefore still inherits the simplicity and fragility of JSON persistence.
3. Cucumber emits a Node-version warning in this environment, even though execution succeeds.

## Severity

- Problem 1: Low
- Problem 2: Low
- Problem 3: Low

## Recommended fixes before acceptance

- Accept this iteration as implemented.
- Keep the current minimal setup.
- In future iterations, keep the same testing discipline and only increase complexity if the project really needs it.

## Recommendation

Accepted