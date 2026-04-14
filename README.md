# Second Practical Experiment - Agentic Development Workflow

This repository contains the work for the second practical experiment of the course.

## Goal

Build a simple web system for managing students, classes, and assessments, using an AI agent as part of the development workflow.

## Mandatory stack

- React + TypeScript (client)
- Node + TypeScript (server)
- Gherkin/Cucumber for acceptance tests
- JSON persistence

## Repository structure

- `sistema/` contains the actual system and tests
- `HistóricoDoMeuExperimento.xlsx` stores the experiment interaction history
- `RevisãoDoSistemaDoMeuColega.md` will contain the peer review

## Workflow principle

This project uses a multi-agent operating model:

- Planner
- Implementer
- Technical Reviewer
- Binary Judge
- Historian
- Closer

The human remains the final decision-maker for acceptance, rejection, and commits.