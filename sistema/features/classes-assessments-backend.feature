Feature: Classes and assessments backend acceptance
  The classes and assessments APIs should support the required backend flows.

  Background:
    Given the classes backend API is available

  Scenario: List classes
    When I request the classes list
    Then the response status should be 200
    And the response body should be a classes array

  Scenario: Create a class successfully
    When I create a class with topic "Algorithms", year 2026, semester 1, and student ids "student-1,student-2"
    Then the response status should be 201
    And the response should include class data with topic "Algorithms", year 2026, semester 1, and student ids "student-1,student-2"

  Scenario: Reject invalid class payload on create
    When I create a class with topic "", year 2026, semester 3, and student ids "student-1"
    Then the response status should be 400
    And the response should include a validation issue on field "topic"
    And the response should include a validation issue on field "semester"

  Scenario: Update a class successfully
    Given a class exists with topic "Compilers", year 2026, semester 2, and student ids "student-3"
    When I update that class with topic "Compilers Updated", year 2027, semester 1, and student ids "student-3,student-4"
    Then the response status should be 200
    And the response should include class data with topic "Compilers Updated", year 2027, semester 1, and student ids "student-3,student-4"

  Scenario: Return 404 when updating a missing class
    When I update missing class id "missing-class-id" with topic "Ghost", year 2026, semester 1, and student ids "student-1"
    Then the response status should be 404

  Scenario: Delete a class successfully
    Given a class exists with topic "Distributed Systems", year 2026, semester 1, and student ids "student-5"
    When I delete that class
    Then the response status should be 204
    When I request the classes list
    Then the response status should be 200
    And the classes list should not contain the last class id

  Scenario: Return 404 when deleting a missing class
    When I delete missing class id "missing-class-id"
    Then the response status should be 404

  Scenario: Get assessments for an existing class
    Given a class exists with topic "Software Testing", year 2026, semester 1, and student ids "student-6"
    When I request assessments for that class
    Then the response status should be 200
    And the response should include assessments payload for that class

  Scenario: Return 404 for assessments of missing class
    When I request assessments for missing class id "missing-class-id"
    Then the response status should be 404

  Scenario: Update one assessment successfully for an enrolled student
    Given a class exists with topic "Requirements", year 2026, semester 2, and student ids "student-7"
    When I update assessment for that class with student id "student-7", goal "Requirements", and concept "MPA"
    Then the response status should be 200
    And the response should include assessment update for student id "student-7", goal "Requirements", and concept "MPA"
    When I request assessments for that class
    Then the response status should be 200
    And the assessments payload should include concept "MPA" for student id "student-7" and goal "Requirements"

  Scenario: Reject invalid concept with 400
    Given a class exists with topic "Architecture", year 2026, semester 1, and student ids "student-8"
    When I update assessment for that class with student id "student-8", goal "Design", and concept "INVALID"
    Then the response status should be 400
    And the response should include a validation issue on field "concept"

  Scenario: Reject non-enrolled student with 400
    Given a class exists with topic "Databases", year 2026, semester 1, and student ids "student-9"
    When I update assessment for that class with student id "student-10", goal "Normalization", and concept "MA"
    Then the response status should be 400

  Scenario: Return 404 when updating assessment for a missing class
    When I update assessment for missing class id "missing-class-id" with student id "student-10", goal "Normalization", and concept "MA"
    Then the response status should be 404
