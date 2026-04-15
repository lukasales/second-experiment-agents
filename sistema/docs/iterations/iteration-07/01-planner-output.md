# Planner Output - Iteration 07

## 1. Iteration objective

Harden the students backend validation by enforcing CPF as exactly 11 numeric digits for both create and update flows.

## 2. Out of scope

Do not implement:
- frontend changes
- CPF formatting mask
- advanced CPF business validation beyond numeric-only + 11 digits
- classes
- assessments
- notifications
- unrelated backend refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/server/src/modules/students/student.validation.ts`
- possibly `sistema/server/src/modules/students/student.service.ts` only if strictly needed

## 4. Acceptance criteria

- create rejects non-numeric CPF
- create rejects CPF with length different from 11
- update rejects non-numeric CPF
- update rejects CPF with length different from 11
- valid 11-digit numeric CPF still works
- backend builds successfully

## 5. Risks and review points

- validation logic duplicated outside the shared validator
- field-level errors becoming inconsistent
- valid flows breaking after CPF hardening
- scope drifting into broader validation redesign

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-07/00-iteration-brief.md
- sistema/docs/iterations/iteration-07/01-planner-output.md
- sistema/server/src/modules/students/student.validation.ts
- sistema/server/src/modules/students/student.service.ts
- sistema/server/src/modules/students/index.ts

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.