Feature: Students backend acceptance
  The students API should support CRUD operations and duplicate checks.

  Background:
    Given the students API is available

  Scenario: List students
    When I request the students list
    Then the response status should be 200
    And the response body should be a students array

  Scenario: Create a student successfully
    When I create a student with name "Ana Silva", cpf "12345678901", and email "ana.silva@example.com"
    Then the response status should be 201
    And the response should include student data with name "Ana Silva", cpf "12345678901", and email "ana.silva@example.com"

  Scenario: Reject duplicate CPF on create
    Given a student exists with name "Bruno Costa", cpf "11111111111", and email "bruno.costa@example.com"
    When I create a student with name "Bruna Costa", cpf "11111111111", and email "bruna.costa@example.com"
    Then the response status should be 409
    And the response should include a conflict on field "cpf"

  Scenario: Reject duplicate email on create
    Given a student exists with name "Carlos Lima", cpf "22222222222", and email "carlos.lima@example.com"
    When I create a student with name "Carla Lima", cpf "33333333333", and email "carlos.lima@example.com"
    Then the response status should be 409
    And the response should include a conflict on field "email"

  Scenario: Update a student successfully
    Given a student exists with name "Diego Melo", cpf "44444444444", and email "diego.melo@example.com"
    When I update that student with name "Diego Melo Updated", cpf "44444444444", and email "diego.updated@example.com"
    Then the response status should be 200
    And the response should include student data with name "Diego Melo Updated", cpf "44444444444", and email "diego.updated@example.com"

  Scenario: Delete a student successfully
    Given a student exists with name "Erica Souza", cpf "55555555555", and email "erica.souza@example.com"
    When I delete that student
    Then the response status should be 204
    When I request the students list
    Then the response status should be 200
    And the student list should not contain the last student id
