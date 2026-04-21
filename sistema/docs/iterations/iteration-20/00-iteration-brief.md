# Iteration 20 - Notifications backend: consolidated daily email

## Purpose

This iteration implements the backend notification flow so assessment changes are consolidated by student and day, and one daily email can be sent per student.

## Functional scope

Implement only:
- record assessment changes when `PUT /api/assessments` succeeds
- consolidate changes by student and day
- persist consolidated notification data in backend JSON storage
- send one daily consolidated email per student through an explicit dispatch endpoint
- prevent duplicate sending for already-dispatched daily notifications

## Required backend behavior

- when an assessment update succeeds, the system must register that change for the affected student on the current date
- if multiple assessment changes happen for the same student on the same day, they must be consolidated into one daily notification record
- the consolidated notification must include changes from multiple classes if applicable
- repeated changes to the same `(classId, goal)` on the same day for the same student should keep only the latest concept value in the daily notification record
- an explicit backend endpoint must trigger daily email dispatch for pending notifications
- after a successful dispatch, the notification must be marked as sent so it is not sent again

## Expected persistence model

Use a JSON file for notifications, for example `notifications.json`, with a structure compatible with one daily record per student and date, such as:

```json
[
  {
    "id": "notification-1",
    "studentId": "student-123",
    "date": "2026-04-20",
    "changes": [
      {
        "classId": "class-1",
        "goal": "Requirements",
        "concept": "MPA"
      },
      {
        "classId": "class-2",
        "goal": "Tests",
        "concept": "MA"
      }
    ],
    "sentAt": null
  }
]
```

## Expected dispatch behavior

Implement an explicit backend endpoint such as:
- `POST /api/notifications/daily-dispatch`

Behavior:
- collect pending notifications for the requested date or current date
- resolve student email addresses using existing student data
- send one consolidated email per student
- mark successfully sent notifications with `sentAt`
- return a summary of what was dispatched

## Email behavior

- one email per student per day
- consolidated content for all that student's changes on that date
- include enough information to identify:
  - class
  - goal
  - concept

## Explicitly out of scope

Do not implement:
- notifications frontend
- automatic cron scheduling
- retries/retry queues
- advanced templating system
- analytics/reporting dashboards
- frontend changes
- frontend tests
- broad refactors outside notifications and directly related backend wiring

## Technical constraints

- keep the implementation modular
- keep route handlers thin
- do not break the existing assessments update flow
- integrate notifications with the current assessments update behavior
- use existing student and class data sources to resolve recipients and class context
- support local/manual triggering for validation
- if SMTP configuration is unavailable, prefer a development-safe transport strategy instead of blocking the whole implementation

## Acceptance criteria

1. Successful assessment updates create or update a daily notification record.
2. Multiple same-day changes for one student are consolidated into one daily notification.
3. Changes across different classes on the same day are included in that same student's daily notification.
4. `POST /api/notifications/daily-dispatch` sends one email per student for pending notifications.
5. Sent notifications are marked so they are not dispatched again.
6. Backend build succeeds.

## Expected risk points

- breaking the current assessment update flow
- accidentally creating multiple daily records for the same student/date
- duplicate changes instead of keeping the latest concept for the same class/goal
- dispatching the same notification more than once
- email transport assumptions failing in local development