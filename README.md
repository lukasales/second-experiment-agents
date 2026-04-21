# Second Practical Experiment - Delivery Guide

This repository contains the second practical experiment for an agent-assisted software development workflow.

## Project Purpose

The system manages:

- students
- classes
- assessments by class and goal
- daily consolidated notifications for assessment changes

It was built incrementally with agent roles (Planner, Implementer, Technical Reviewer, Binary Judge, Historian, Closer), with final human approval for decisions and commits.

## Implemented Modules

- Students module:
  - create
  - list
  - update
  - delete
- Classes module:
  - create
  - list
  - update
  - delete
  - enroll students
- Assessments module:
  - class-specific assessment retrieval
  - one-cell-at-a-time assessment update
  - concepts: `MANA`, `MPA`, `MA`
- Notifications module:
  - records successful assessment updates
  - consolidates one daily record per student/date
  - keeps latest concept for repeated `(classId, goal)`
  - supports manual daily dispatch
  - prevents re-sending after `sentAt` is set
- Notifications page (frontend):
  - lists consolidated notifications
  - shows status, sentAt, and consolidated changes
  - allows manual dispatch trigger

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + TypeScript + Express
- Acceptance tests: Cucumber (Gherkin)
- Persistence: JSON files

## Repository Structure

- `sistema/client`: React frontend
- `sistema/server`: Node/TypeScript API and Cucumber setup
- `sistema/features`: backend acceptance feature files
- `sistema/docs`: project scope and iteration artifacts
- `HistóricoDoMeuExperimento.xlsx`: experiment history spreadsheet
- `RevisãoDoSistemaDoMeuColega.md`: peer review writeup

## Live Deployment

- Frontend: `https://second-experiment-agents.onrender.com`
- Backend: `https://second-experiment-agents-backend.onrender.com`
- Health check: `https://second-experiment-agents-backend.onrender.com/api/health`

## Ports and Runtime Defaults

Local defaults:

- Backend API: `http://localhost:3001`
- Frontend dev server: `http://localhost:5173`
- Backend CORS client origin: `http://localhost:5173`

Environment variables:

- `PORT`: API port, default `3001`
- `CLIENT_ORIGIN`: allowed frontend origin, default `http://localhost:5173`
- `VITE_API_BASE_URL`: backend base URL used by the frontend build

## JSON Persistence Files

Persistent files are in `sistema/server/data`:

- `students.json`
- `classes.json`
- `notifications.json`

Notes:

- Acceptance tests reset and restore JSON files for deterministic execution.
- `notifications.json` stores one daily record per student/date, with `sentAt` tracking dispatch state.

## Setup

Run commands in each package directory, not at repository root.

### Backend

```bash
cd sistema/server
npm install
```

### Frontend

```bash
cd ../client
npm install
```

## Run Locally

### Backend

From `sistema/server`:

```bash
npm run dev
```

Health check:

```text
GET http://localhost:3001/api/health
```

### Frontend

From `sistema/client`:

```bash
npm run dev
```

Then open the URL shown by Vite, typically:

```text
http://localhost:5173
```

## Acceptance Tests

From `sistema/server`:

1. Keep backend running on port 3001.
2. In another terminal, run:

```bash
npm run test:acceptance
```

Optional override for API base used by step definitions:

```text
STUDENTS_API_BASE_URL=http://localhost:3001/api
```

## Build Commands

### Backend

From `sistema/server`:

```bash
npm run build
```

### Frontend

From `sistema/client`:

```bash
npm run build
```

## Manual Validation Flows

1. Students flow
   - create student
   - edit student
   - delete student
   - confirm list updates
2. Classes flow
   - create class with enrolled students
   - edit class data and enrollment
   - delete class
3. Assessments flow
   - select a class
   - update assessment concept for an enrolled student
   - verify matrix updates correctly
   - verify first-launch matrix works for classes with enrolled students but no previous assessments
4. Notifications flow
   - perform multiple same-day assessment updates for one student
   - include updates from different classes
   - repeat one `(classId, goal)` with a new concept
   - verify one consolidated daily record with latest concept only
5. Dispatch flow
   - trigger `POST /api/notifications/daily-dispatch`
   - verify `sentAt` is set after successful dispatch
   - trigger dispatch again and confirm no resend for already sent records

## How Notifications Work

When `PUT /api/assessments` succeeds, the backend records a notification change.

Consolidation key is `(studentId, date)`.

Inside one daily record:

- updates from multiple classes are preserved
- repeated `(classId, goal)` keeps only the latest concept
- `POST /api/notifications/daily-dispatch` sends pending daily notifications
- successful dispatch sets `sentAt`, preventing duplicate sending in later dispatches

Email transport is development-safe by default and logs dispatch content, so validation does not depend on SMTP infrastructure.

## Notifications Page Demonstration

The frontend Notifications page exposes backend notification state for evaluator visibility:

- student
- date
- status (Pending / Sent)
- sentAt
- consolidated changes (class, goal, concept)

The page also includes a manual Run daily dispatch action and refreshes data after dispatch.

## Deployment Notes

### Backend (Render Web Service)

Configured as:

- Root Directory: `sistema/server`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`

Environment variable used:

- `CLIENT_ORIGIN=https://second-experiment-agents.onrender.com`

### Frontend (Render Static Site)

Configured as:

- Root Directory: `sistema/client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

Environment variable used:

- `VITE_API_BASE_URL=https://second-experiment-agents-backend.onrender.com`

## Important Deploy Caveat

This project persists data in local JSON files.

On Render Free, filesystem persistence is limited and ephemeral, so stored JSON data may reset after restart or redeploy. This is acceptable for evaluator demonstration, but it is not a production-grade persistence strategy.

## Final Delivery Checklist

- Code for delivered system: present
- Backend acceptance tests: present and updated for notifications coverage
- Iteration documentation: present under `sistema/docs/iterations`
- Experiment history spreadsheet: present (`HistóricoDoMeuExperimento.xlsx`)
- README for evaluator onboarding: present
- Deploy/access guidance: documented and deployed
- Peer review writeup: present separately in `RevisãoDoSistemaDoMeuColega.md`