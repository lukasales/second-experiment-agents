Feature: Notifications backend acceptance
  The notifications API should consolidate daily changes and dispatch them once.

  Background:
    Given the notifications backend API is available
    And a notification test student exists with name "Notif Student", cpf "77777777777", and email "notif.student@example.com"

  Scenario: Consolidate same-day updates by student/date, keep latest concept, and include multiple classes
    Given a notification test class exists with topic "Notif Class A", year 2026, semester 1, and enrolled notification test student
    And a notification test class exists with topic "Notif Class B", year 2026, semester 1, and enrolled notification test student
    When I update notification test assessment in class A with goal "Requirements" and concept "MA"
    And I update notification test assessment in class A with goal "Requirements" and concept "MPA"
    And I update notification test assessment in class B with goal "Tests" and concept "MANA"
    And I request the notifications list
    Then the response status should be 200
    And there should be exactly one notification record for the notification test student on today
    And that daily notification should include class A goal "Requirements" with concept "MPA"
    And that daily notification should include class B goal "Tests" with concept "MANA"
    And that daily notification should not include class A goal "Requirements" with concept "MA"

  Scenario: Dispatch notifications successfully and do not resend after sentAt
    Given a notification test class exists with topic "Dispatch Class", year 2026, semester 2, and enrolled notification test student
    When I update notification test assessment in class A with goal "Requirements" and concept "MA"
    And I request the notifications list
    Then the response status should be 200
    And there should be exactly one pending notification record for the notification test student on today
    When I run daily notifications dispatch for the captured notification date
    Then the response status should be 200
    And the dispatch result should report sent count 1 and failed count 0
    And I request the notifications list
    Then the response status should be 200
    And the notification record for the notification test student on today should be marked as sent
    When I run daily notifications dispatch for the captured notification date
    Then the response status should be 200
    And the dispatch result should report sent count 0 and failed count 0

  Scenario: Dispatch without explicit date uses today and sends pending notifications
    Given a notification test class exists with topic "Dispatch Default Date Class", year 2026, semester 2, and enrolled notification test student
    When I update notification test assessment in class A with goal "Quality" and concept "MPA"
    And I request the notifications list
    Then the response status should be 200
    And there should be exactly one pending notification record for the notification test student on today
    When I run daily notifications dispatch without date
    Then the response status should be 200
    And the dispatch result should report date as today
    And the dispatch result should report sent count 1 and failed count 0

  Scenario: Reject invalid dispatch date format
    When I run daily notifications dispatch for invalid date "2026-99-99"
    Then the response status should be 400
    And the response should include message "Invalid date. Expected format: YYYY-MM-DD."
