# Binary Judge - Iteration 06

## Decision

Accepted

## Why

The corrective frontend-hardening slice works as requested:

- CPF input keeps only digits
- CPF input is limited to 11 digits
- submission is blocked when CPF does not contain exactly 11 digits
- valid 11-digit CPF submissions still work
- long names and emails remain visually contained in the students list
- the existing visual style and layout remain intact

The iteration stayed localized and did not introduce unrelated changes.

## Evidence

- letters and symbols entered into CPF were removed
- pasted CPF values longer than 11 digits were capped
- short CPF submission showed a clear error and did not send the request
- valid CPF submission still created a student successfully
- long values no longer broke the list layout
- frontend build succeeded

## What must happen next

- record this iteration in the spreadsheet
- commit the iteration
- move to a backend CPF-validation hardening iteration so the API enforces the same rule