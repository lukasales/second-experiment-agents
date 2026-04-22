Feature: Backend health acceptance
  The API should expose health and root endpoints for readiness checks.

  Scenario: Health endpoint returns service status
    When I request the backend health endpoint
    Then the response status should be 200
    And the health payload should report status "ok" and service "server"

  Scenario: Root endpoint returns running message
    When I request the backend root endpoint
    Then the response status should be 200
    And the root payload should include message "Second Experiment API is running."
