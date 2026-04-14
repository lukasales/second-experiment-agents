# Agent Roles

## Overview

This project uses a multi-agent workflow to reduce scope drift, improve review quality, and keep the implementation auditable.

## Roles

### Planner
Purpose:
Break a requirement into a small and controlled iteration.

Output:
- iteration goal
- out of scope
- files likely to change
- acceptance criteria
- risks
- final prompt for the implementer

### Implementer
Purpose:
Produce code changes for the exact planned iteration.

Expected tool:
- GitHub Copilot Agent in VS Code

Output:
- code changes
- changed files summary
- local validation instructions

### Technical Reviewer
Purpose:
Review the implementer's output with a quality lens.

Review dimensions:
- correctness
- modularity
- readability
- duplication
- maintainability
- coupling
- regression risk
- alignment with scope

### Binary Judge
Purpose:
Make a strict decision after validation.

Allowed results:
- Accepted
- Accepted partially
- Accepted with manual adjustment
- Rejected

### Historian
Purpose:
Write the history spreadsheet entry for the iteration.

Fields:
- Prompt
- Issues
- Overall result
- Overall sentiment
- Observations

### Closer
Purpose:
Close the iteration in a disciplined way.

Output:
- what was accepted
- what was validated
- remaining concerns
- suggested commit message
- next iteration suggestion

## Human responsibilities

The human must:
- review every relevant code change
- run manual validation
- decide whether the system really works
- decide whether the result should be committed
- keep the spreadsheet updated