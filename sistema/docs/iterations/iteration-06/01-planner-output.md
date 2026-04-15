# Planner Output - Iteration 06

## 1. Iteration objective

Harden the students frontend by:
- fixing long-content layout overflow in the students list
- constraining CPF input to 11 numeric digits
- blocking invalid CPF submission in the UI

## 2. Out of scope

Do not implement:
- backend CPF validation
- edit UI
- delete UI
- classes UI
- assessments UI
- notifications UI
- frontend tests
- unrelated UI refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/client/src/pages/StudentsPage.tsx`
- `sistema/client/src/styles.css`

## 4. Acceptance criteria

- long names and emails stay visually contained
- CPF input accepts digits only
- CPF input stops at 11 digits
- invalid CPF length blocks submit with a clear error
- valid 11-digit CPF still submits successfully
- frontend builds successfully

## 5. Risks and review points

- CSS fixes that work only for one specific case
- sanitization logic duplicated or unclear
- validation message conflicting with backend messages
- accidental regression in the existing create flow

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-06/00-iteration-brief.md
- sistema/docs/iterations/iteration-06/01-planner-output.md
- sistema/client/src/pages/StudentsPage.tsx
- sistema/client/src/config/studentsApi.ts
- sistema/client/src/styles.css

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.