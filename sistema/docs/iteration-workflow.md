# Iteration Workflow

## Principle

Every relevant interaction with the implementation agent must be small enough to review comfortably.

## Standard iteration sequence

### Step 1 - Plan
Use the Planner agent to define:
- one small objective
- clear boundaries
- acceptance criteria
- likely changed files
- risks

### Step 2 - Record the prompt
Before or immediately after sending the implementation prompt, record the exact prompt text in the spreadsheet.

### Step 3 - Implement
Send the final implementation prompt to the Implementer agent.

### Step 4 - Validate locally
Check:
- compilation
- execution
- expected feature behavior

### Step 5 - Review technically
Use the Technical Reviewer to inspect:
- correctness
- modularity
- code quality
- risk areas

### Step 6 - Judge
Use the Binary Judge and choose exactly one:
- Accepted
- Accepted partially
- Accepted with manual adjustment
- Rejected

### Step 7 - Update history
Use the Historian to write:
- Issues
- Overall result
- Overall sentiment
- Observations

### Step 8 - Close
Use the Closer to summarize the iteration and suggest a commit message.

### Step 9 - Commit
If some part of the agent output was accepted, create a commit.

## Rules

1. No broad prompts.
2. No multi-feature prompts unless intentionally planned.
3. No "done" status without manual validation.
4. No blind trust in generated tests.
5. No acceptance without reviewing the changed files.