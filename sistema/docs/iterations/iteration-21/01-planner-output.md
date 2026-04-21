# Planner Output - Iteration 21

## 1. Iteration objective

Finalize the experiment delivery by hardening the current implementation where necessary, confirming backend acceptance coverage, improving README for evaluator onboarding, preparing or completing deployment, and verifying the final repository checklist.

## 2. Out of scope

Do not implement:
- new unrelated product features
- frontend automated tests
- peer review writeup if intentionally postponed
- large redesigns
- broad unnecessary refactors

## 3. Likely files to change

Expected changes may stay close to:
- `sistema/README.md` or repository root `README.md`
- `sistema/server/features/**`
- `sistema/server/features/support/**`
- `sistema/features/**`
- deployment-related config files only if needed
- small backend/frontend config/docs files only if needed for final delivery
- final iteration docs under `sistema/docs/iterations/iteration-21/`

## 4. Acceptance criteria

- backend acceptance coverage is updated or confirmed for students, classes, assessments, and notifications
- README clearly explains setup, execution, tests, and evaluation flows
- deploy preparation is completed and documented, or deploy is completed
- final delivery checklist is reviewed
- backend build succeeds
- frontend build succeeds

## 5. Risks and review points

- breaking stable code during final cleanup
- under-documenting the project for evaluators
- deploy issues caused by JSON persistence and environment assumptions
- leaving manual evaluation steps unclear
- spending effort on low-value polish instead of delivery readiness

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-21/00-iteration-brief.md
- sistema/docs/iterations/iteration-21/01-planner-output.md
- README.md
- sistema/server/package.json
- sistema/client/package.json
- sistema/server/features/support/hooks.js
- sistema/server/features/step_definitions/classes-assessments.steps.js
- sistema/server/src/modules/notifications/index.ts
- sistema/client/src/pages/NotificationsPage.tsx

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.