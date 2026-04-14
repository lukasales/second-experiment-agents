# Project Scope

## Project goal

Build a simple web application for managing students, classes, and student assessments, using an AI-assisted development workflow.

## Mandatory functional scope

### 1. Student management
The system must allow:
- creating students
- editing students
- removing students
- listing registered students

Each student must have:
- name
- CPF
- email

### 2. Assessment management page
The system must provide a separate page for assessment management.

This page must show:
- student names in the first column
- assessment goals in separate columns

Assessment values must use only:
- MANA
- MPA
- MA

### 3. JSON persistence
The system must persist students and assessments in JSON.

### 4. Class management
The system must allow:
- creating classes
- editing classes
- removing classes

Each class must contain:
- topic description
- year
- semester
- enrolled students
- assessment information for those students in that class

It must be possible to visualize each class separately with its students and assessments.

### 5. Email notification
When a teacher fills in or changes a student's assessment for some goal, the student should receive only one email per day containing all assessment changes for that day across all classes in which the student is enrolled.

## Architectural interpretation used in this project

To stay aligned with the specification:

- Assessments are class-specific.
- Goals exist as assessment columns, but goal CRUD is not part of the mandatory scope.
- The system will prioritize correctness and traceability over visual sophistication.

## Explicitly out of scope

- authentication
- permissions
- SQL or NoSQL database setup
- role management
- dashboards
- analytics
- reports beyond the required views
- CRUD for goals
- advanced UI polish

## Mandatory technical scope

- React + TypeScript on the client
- Node + TypeScript on the server
- Gherkin/Cucumber for acceptance tests
- Git-based development with incremental commits