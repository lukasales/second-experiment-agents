# Delivery Checklist - Iteration 21

## Scope of this checklist

Final delivery readiness verification for:

- code
- backend acceptance tests
- iteration docs
- experiment spreadsheet
- README
- deploy/access guidance

Peer review writeup remains intentionally pending outside this iteration.

## Verification results

- Code for delivered system: present under sistema/
- Backend acceptance tests: present and passing
- Iteration documentation: present under sistema/docs/iterations/
- Experiment spreadsheet: present at repository root (HistoricoDoMeuExperimento.xlsx)
- README for evaluator onboarding: updated and present at repository root
- Deploy/access guidance: documented in README
- Peer review writeup: pending by decision (outside this iteration)

## Backend acceptance coverage confirmation

Covered flows:

- students
- classes
- assessments
- notifications

Notifications acceptance now explicitly validates:

- daily consolidation by student/date
- multiple classes in one daily record
- latest concept wins for repeated (classId, goal)
- successful dispatch
- no resend after sentAt

## Determinism and JSON isolation

Acceptance hooks now reset and restore:

- students.json
- classes.json
- notifications.json

This keeps scenarios deterministic and avoids cross-scenario contamination.

## Final technical checks executed

From sistema/server:

- npm run test:acceptance
- npm run build

From sistema/client:

- npm run build

Result summary:

- 17 scenarios passed
- backend build passed
- frontend build passed

## Caveats kept intentionally

- Notification dispatch remains manual (no scheduler/cron), by scope.
- Email transport is development-safe (logs content), suitable for local/demo validation.
- JSON persistence requires persistent filesystem in hosted environments if data retention is expected.
