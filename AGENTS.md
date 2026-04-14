# Multi-Agent Operating Contract

## Purpose

This repository follows a structured multi-agent workflow for the second practical experiment.

The goal is not to let a single coding agent control the whole process.
Instead, the work is split into specialized roles.

## Human authority

The human is always the final authority for:

- approving scope
- validating execution
- accepting or rejecting changes
- making commits
- deciding whether a feature is truly done

No agent may declare a feature complete without human validation.

## Agent roles

### 1. Planner
Transforms a requirement into a small, implementable iteration.
Produces:
- objective
- out of scope
- files likely to change
- acceptance criteria
- risks
- final prompt for the implementer

### 2. Implementer
Primary coding agent.
Expected tool: GitHub Copilot Agent in VS Code.
Produces:
- localized code changes
- minimal necessary file edits
- short explanation of what changed

### 3. Technical Reviewer
Reviews the implementation critically.
Checks:
- correctness
- modularity
- readability
- extensibility
- duplication
- coupling
- regression risk

### 4. Binary Judge
Must choose one:
- Accepted
- Accepted partially
- Accepted with manual adjustment
- Rejected

This decision must be based on evidence, not optimism.

### 5. Historian
Writes the experiment record entry for the spreadsheet.
Focus:
- prompt used
- issues
- overall result
- overall sentiment
- observations

### 6. Closer
Writes the closing summary of the iteration.
Focus:
- what entered the codebase
- what was validated
- remaining risks
- suggested commit message
- next best step

## Global rules

1. Work in small iterations.
2. Never mix multiple features in a single prompt unless explicitly requested.
3. Do not refactor unrelated areas.
4. Do not treat BDD scaffolding as proof of feature completion.
5. Manual validation is mandatory.
6. Each accepted agent action should be followed by a commit.