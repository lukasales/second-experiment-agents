# Second Practical Experiment - Delivery Guide

This repository contains the second practical experiment for an agent-assisted software development workflow.

## Project purpose

The system manages:

- students
- classes
- assessments by class and goal
- daily consolidated notifications for assessment changes

It was built incrementally with agent roles (Planner, Implementer, Technical Reviewer, Binary Judge, Historian, Closer), with final human approval for decisions and commits.

## Implemented modules

- Students module: create, list, update, delete students
- Classes module: create, list, update, delete classes
- Assessments module: class-specific assessment updates and retrieval
- Notifications module:
  - records successful assessment updates
  - consolidates one daily record per student/date
  - keeps latest concept for repeated (classId, goal)
  - supports manual daily dispatch
  - prevents re-sending after sentAt is set
- Notifications page (frontend):
  - lists consolidated notifications
  - shows status, sentAt, and consolidated changes
  - allows manual dispatch trigger

## Tech stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + TypeScript + Express
- Acceptance tests: Cucumber (Gherkin)
- Persistence: JSON files

## Repository structure

- sistema/client: React frontend
- sistema/server: Node/TypeScript API and Cucumber setup
- sistema/features: backend acceptance feature files
- sistema/docs: project scope and iteration artifacts
- HistóricoDoMeuExperimento.xlsx: experiment history spreadsheet
- RevisãoDoSistemaDoMeuColega.md: peer review writeup (intentionally pending)

## Ports and runtime defaults

- Backend API default: http://localhost:3001
- Frontend dev server default: http://localhost:5173
- Backend CORS default client origin: http://localhost:5173

Backend can receive:

- PORT: API port (default 3001)
- CLIENT_ORIGIN: allowed frontend origin (default http://localhost:5173)

## JSON persistence files

Persistent files are in sistema/server/data:

- students.json
- classes.json
- notifications.json

Notes:

- Acceptance tests reset and restore JSON files for deterministic execution.
- notifications.json stores one daily record per student/date, with sentAt tracking dispatch state.

## Install dependencies (ordered)

Run commands in each package directory, not at repository root.

1. Backend dependencies:
	- cd sistema/server
	- npm install
2. Frontend dependencies:
	- cd ../client
	- npm install

## Run backend

From sistema/server:

1. npm run dev
2. API health check:
	- GET http://localhost:3001/api/health

## Run frontend

From sistema/client:

1. npm run dev
2. Open the URL shown by Vite (typically http://localhost:5173)

## Run backend acceptance tests

From sistema/server:

1. Keep backend running on port 3001
2. In another terminal (also in sistema/server), run:
	- npm run test:acceptance

Optional override for API base used by step definitions:

- STUDENTS_API_BASE_URL=http://localhost:3001/api

## Build commands

- Backend build (from sistema/server): npm run build
- Frontend build (from sistema/client): npm run build

## Main manual validation flows

1. Students flow:
	- create student
	- edit student
	- delete student
	- confirm list updates
2. Classes flow:
	- create class with enrolled students
	- edit class data/enrollment
	- delete class
3. Assessments flow:
	- update assessment concept for enrolled student
	- verify class assessments endpoint reflects the update
4. Notifications flow:
	- perform multiple same-day assessment updates for one student
	- include updates from different classes
	- repeat one (classId, goal) with a new concept
	- verify one consolidated daily record with latest concept only
5. Dispatch flow:
	- trigger POST /api/notifications/daily-dispatch
	- verify sentAt is set after successful dispatch
	- trigger dispatch again and confirm no resend for already sent records

## How notifications work

1. When PUT /api/assessments succeeds, backend records a notification change.
2. Consolidation key is (studentId, date).
3. Inside one daily record:
	- updates from multiple classes are preserved
	- repeated (classId, goal) keeps only the latest concept
4. POST /api/notifications/daily-dispatch sends pending daily notifications.
5. Successful dispatch sets sentAt, preventing duplicate send in later dispatches.

Email transport is development-safe by default (logs dispatch content), so local validation does not depend on SMTP infrastructure.

## Notifications page demonstration

Frontend page shows backend notification state for evaluator visibility:

- student
- date
- status (pending/sent)
- sentAt
- consolidated changes (class, goal, concept)

The page also includes a manual "Run daily dispatch" action and refreshes data after dispatch.

## Deploy information

No mandatory public deployment URL is bundled in this repository.

Evaluator-ready deployment path (minimal, no over-engineering):

1. Deploy backend as a Node service:
	- build command: npm run build
	- start command: npm run start
	- working directory: sistema/server
	- environment: PORT, CLIENT_ORIGIN
	- persistent volume or file persistence support required for sistema/server/data
2. Deploy frontend as static site:
	- build command: npm run build
	- publish directory: dist
	- working directory: sistema/client
3. Ensure frontend API base points to deployed backend URL if needed.

Important deploy caveat:

- If hosting is ephemeral and does not persist local files, JSON storage will reset between restarts. Use persistent disk/volume for evaluator demonstrations that require retained data.

## Final delivery checklist status

- Code for delivered system: present
- Backend acceptance tests: present and updated for notifications coverage
- Iteration documentation: present under sistema/docs/iterations
- Experiment history spreadsheet: present (HistóricoDoMeuExperimento.xlsx)
- README for evaluator onboarding: present (this file)
- Deploy/access guidance: documented above
- Peer review writeup: intentionally pending outside this iteration