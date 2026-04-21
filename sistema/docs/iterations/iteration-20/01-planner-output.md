# Planner Output - Iteration 20

## 1. Iteration objective

Implement the backend notifications flow so assessment changes are recorded, consolidated by student/day, and dispatched as one daily email per student.

## 2. Out of scope

Do not implement:
- notifications frontend
- cron scheduling
- retry queues
- advanced email templating
- analytics/reporting
- frontend changes
- frontend tests
- unrelated backend refactors

## 3. Likely files to change

Expected changes should stay close to:
- `sistema/server/src/modules/notifications/index.ts`
- `sistema/server/src/modules/notifications/` new helper files as needed
- `sistema/server/src/modules/assessments/index.ts`
- `sistema/server/src/modules/assessments/assessment.service.ts`
- `sistema/server/src/routes/index.ts`
- `sistema/server/src/shared/types/domain.ts`
- `sistema/server/data/notifications.json`
- `sistema/server/package.json` only if email transport dependency is necessary

## 4. Acceptance criteria

- successful assessment updates create or update a daily notification record
- same-day changes for one student are consolidated into one record
- changes from multiple classes are preserved in that one daily record
- repeated updates to the same class/goal keep only the latest concept value
- `POST /api/notifications/daily-dispatch` sends one email per student for pending notifications
- sent notifications are marked so they are not sent again
- backend build succeeds

## 5. Risks and review points

- breaking the current assessments update flow
- duplicate notification records for the same student/date
- duplicate or stale entries in `changes`
- email delivery strategy becoming too ambitious
- insufficient local/manual validation path

## 6. Final implementation prompt for Copilot Agent

Before making any code changes, read and consider these files from the workspace:

- sistema/.github/copilot-instructions.md
- sistema/docs/project-scope.md
- sistema/docs/iterations/iteration-20/00-iteration-brief.md
- sistema/docs/iterations/iteration-20/01-planner-output.md
- sistema/server/src/modules/notifications/index.ts
- sistema/server/src/modules/assessments/index.ts
- sistema/server/src/modules/assessments/assessment.service.ts
- sistema/server/src/routes/index.ts
- sistema/server/src/shared/types/domain.ts
- sistema/server/data/README.md

Do not edit any file yet.

First, respond only with:
1. Objective
2. Files you intend to change
3. Out of scope
4. Short implementation plan
5. Manual validation steps
6. Risks or caveats

Wait for my approval before making changes.