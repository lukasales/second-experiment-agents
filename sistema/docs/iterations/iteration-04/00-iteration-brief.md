# Iteration 04 - Students backend acceptance scenarios

## Purpose

This iteration introduces acceptance scenarios for the students backend using Gherkin/Cucumber.

## Functional scope

Implement only:
- Cucumber setup for backend acceptance tests
- Gherkin scenarios for the students backend
- step definitions that call the running backend API

## Scenarios to cover

At minimum, cover:
- list students
- create a student successfully
- reject duplicate CPF on create
- reject duplicate email on create
- update a student successfully
- delete a student successfully

## Explicitly out of scope

Do not implement:
- frontend tests
- classes tests
- assessments tests
- notifications tests
- Cypress
- unrelated backend refactors

## Technical constraints

- prefer JavaScript step definitions for simplicity
- keep the setup minimal and readable
- avoid overengineering the test harness
- tests may assume the backend is already running locally
- test artifacts should use a dedicated test-data reset strategy when necessary

## Acceptance criteria

1. Cucumber is configured in the backend.
2. At least one `.feature` file exists for students.
3. Step definitions exist and can execute.
4. The scenarios cover the core CRUD flow and duplicate checks.
5. The test command is documented and runnable.

## Expected risk points

- unstable tests due to shared JSON state
- step definitions tightly coupled to exact message text
- poor reset strategy causing flaky scenarios
- overcomplicated TypeScript configuration for Cucumber