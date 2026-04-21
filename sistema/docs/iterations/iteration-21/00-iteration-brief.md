# Iteration 21 - Final hardening, backend acceptance coverage, README, deploy, and delivery checklist

## Purpose

This iteration finalizes the experiment delivery by hardening the system, closing backend acceptance coverage, improving evaluator-facing documentation, preparing deployment, and verifying the final required deliverables.

## Functional scope

Implement only:
- final backend hardening adjustments if strictly necessary
- final backend acceptance coverage for the implemented system behavior
- README improvement for evaluator onboarding and local execution
- deployment preparation and/or deployment-related project adjustments
- final delivery checklist verification

## Backend testing scope

The final automated testing scope in this iteration is backend-only.

This includes acceptance/backend validation for the implemented flows:
- students
- classes
- assessments
- notifications

Frontend-specific automated tests are out of scope for this iteration.
Frontend behavior has been manually validated incrementally during implementation and may be described in README or final delivery notes.

## README expectations

The README should clearly explain:
- project purpose
- system modules
- technologies used
- folder structure
- how to install dependencies
- how to run backend
- how to run frontend
- how to run backend acceptance tests
- ports used by backend and frontend
- JSON persistence files used by the system
- how to validate the main flows manually
- how notifications work
- how the Notifications page demonstrates the daily dispatch feature
- any environment/deployment notes needed for evaluation

## Deploy expectations

Deployment work in this iteration may include:
- preparing the project for deployment
- adjusting environment/configuration if needed
- documenting deploy steps
- optionally completing an actual deploy

The goal is to make the system easier to evaluate in practice.

## Final checklist expectations

This iteration must verify that the repository contains or clearly accounts for:
- code for the implemented system
- backend acceptance tests
- iteration documentation
- experiment history spreadsheet
- README ready for evaluation
- deployment guidance or deployed access path

Peer-review deliverable may remain pending outside this iteration if intentionally deferred.

## Explicitly out of scope

Do not implement:
- new product features unrelated to final delivery
- new frontend modules unrelated to delivery/demo polish
- frontend automated tests
- peer review writeup if intentionally postponed
- broad redesigns
- unnecessary refactors

## Technical constraints

- keep changes focused on final delivery
- preserve already working flows
- do not destabilize the system
- prioritize evaluator usability and project clarity
- prefer small, high-confidence improvements

## Acceptance criteria

1. Backend acceptance coverage is updated or confirmed for the delivered system behavior.
2. README is strong enough for an evaluator to run and understand the project.
3. Deployment preparation is completed and documented, or deployment is completed.
4. Final repository checklist is reviewed.
5. Backend build succeeds.
6. Frontend build succeeds.

## Expected risk points

- destabilizing already working features while polishing
- spending too much effort on nonessential refactors
- weak README despite a working codebase
- deploy friction caused by JSON persistence assumptions
- leaving final evaluator steps unclear