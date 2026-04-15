# Iteration 06 - Students frontend slice B

## Purpose

This iteration hardens the students frontend UX after manual review.

## Functional scope

Implement only:
- prevent long student values from breaking the students list layout
- constrain CPF input in the UI to numeric digits only
- limit CPF input to 11 digits in the UI
- block form submission when CPF is not exactly 11 digits
- keep the current polished visual style

## Expected UI behavior

The students page must:
- keep long names, CPF values, and emails visually contained inside the student list card
- allow only digits in the CPF field while typing
- stop CPF input at 11 digits
- show a clear error message if the user tries to submit a CPF with fewer than 11 digits
- preserve the current two-card layout and dark visual style

## Explicitly out of scope

Do not implement:
- backend CPF validation changes
- student edit UI
- student delete UI
- classes UI
- assessments UI
- notifications UI
- frontend tests
- broad UI refactors outside the students page

## Technical constraints

- keep the implementation localized to the students frontend slice
- do not modify backend files
- keep the current visual design direction
- use simple local state and targeted CSS only
- do not add external UI libraries

## Acceptance criteria

1. Long names and emails do not visually break the list card.
2. CPF input accepts digits only.
3. CPF input is limited to 11 digits.
4. Submitting a CPF with length different from 11 shows a clear error and does not send the request.
5. Valid 11-digit CPF submissions still work normally.
6. The frontend builds successfully.

## Expected risk points

- fixing layout with brittle CSS
- frontend CPF validation without input sanitization
- blocking valid submit flow accidentally
- introducing visual regressions in the students page