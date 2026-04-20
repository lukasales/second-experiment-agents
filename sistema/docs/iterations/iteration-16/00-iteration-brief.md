# Iteration 16 - Acceptance tests slice A

## Purpose

This iteration adds acceptance tests for the backend flows that were implemented for classes and assessments.

## Functional scope

Implement only:
- Gherkin acceptance scenarios for classes backend
- Gherkin acceptance scenarios for assessments backend
- step definitions needed to execute those scenarios
- deterministic test data reset for students and classes JSON files if needed

## Required coverage

The acceptance tests must cover at least:

### Classes backend
- list classes
- create class successfully
- update class successfully
- delete class successfully

### Assessments backend
- get assessments for an existing class
- return `404` when the class does not exist
- update one assessment successfully for an enrolled student
- reject invalid concept with `400`
- reject non-enrolled student with `400`

## Technical constraints

- use Gherkin/Cucumber
- keep the scope backend-only for this iteration
- do not implement frontend tests here
- do not rewrite working backend functionality unless strictly required to make tests reliable
- prefer extending the existing Cucumber setup instead of creating a parallel one
- keep scenarios deterministic by controlling JSON baseline data

## Explicitly out of scope

Do not implement:
- assessments frontend
- notification tests
- email sending tests
- Cypress or browser E2E
- broad refactors unrelated to test reliability

## Acceptance criteria

1. There is at least one feature file covering classes and assessments backend flows.
2. The scenarios are executable through the existing server-side Cucumber command.
3. Test data is reset deterministically between scenarios.
4. The scenarios for classes backend pass.
5. The scenarios for assessments backend pass.
6. `npm run test:acceptance` succeeds.
7. `npm run build` still succeeds.

## Expected risk points

- flaky scenarios due to JSON state leakage between scenarios
- overcomplicated hooks
- coupling tests too tightly to exact wording of error messages
- accidentally testing frontend behavior instead of backend acceptance behavior
- expanding the slice too much into notifications