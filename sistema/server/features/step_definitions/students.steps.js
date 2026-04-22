const assert = require("node:assert/strict");
const { Given, When, Then } = require("@cucumber/cucumber");

const apiBaseUrl = process.env.STUDENTS_API_BASE_URL ?? "http://localhost:3001/api";

const requestJson = async (method, endpoint, payload) => {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    method,
    headers: {
      "content-type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  const rawBody = await response.text();
  let body = null;

  if (rawBody) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      body = rawBody;
    }
  }

  return {
    status: response.status,
    body,
  };
};

const createStudent = async (name, cpf, email) => {
  return requestJson("POST", "/students", {
    name,
    cpf,
    email,
  });
};

Given("the students API is available", async function () {
  this.lastResponse = await requestJson("GET", "/students");
  assert.equal(this.lastResponse.status, 200);
  assert.ok(Array.isArray(this.lastResponse.body));
});

Given(
  "a student exists with name {string}, cpf {string}, and email {string}",
  async function (name, cpf, email) {
    const response = await createStudent(name, cpf, email);

    assert.equal(response.status, 201);
    assert.equal(typeof response.body?.id, "string");

    this.lastStudentId = response.body.id;
    this.lastResponse = response;
  }
);

When(
  "I update the student with cpf {string} using name {string}, cpf {string}, and email {string}",
  async function (targetCpf, name, cpf, email) {
    const listResponse = await requestJson("GET", "/students");

    assert.equal(listResponse.status, 200);
    assert.ok(Array.isArray(listResponse.body));

    const targetStudent = listResponse.body.find((student) => student.cpf === targetCpf);

    assert.ok(targetStudent, `Expected to find a student with cpf ${targetCpf}.`);

    this.lastResponse = await requestJson("PUT", `/students/${targetStudent.id}`, {
      name,
      cpf,
      email,
    });
  }
);

When("I request the students list", async function () {
  this.lastResponse = await requestJson("GET", "/students");
});

When(
  "I create a student with name {string}, cpf {string}, and email {string}",
  async function (name, cpf, email) {
    this.lastResponse = await createStudent(name, cpf, email);

    if (this.lastResponse.status === 201 && this.lastResponse.body?.id) {
      this.lastStudentId = this.lastResponse.body.id;
    }
  }
);

When(
  "I update that student with name {string}, cpf {string}, and email {string}",
  async function (name, cpf, email) {
    assert.ok(this.lastStudentId, "Expected an existing student id before update.");

    this.lastResponse = await requestJson("PUT", `/students/${this.lastStudentId}`, {
      name,
      cpf,
      email,
    });
  }
);

When("I delete that student", async function () {
  assert.ok(this.lastStudentId, "Expected an existing student id before delete.");
  this.lastResponse = await requestJson("DELETE", `/students/${this.lastStudentId}`);
});

When(
  "I update missing student id {string} with name {string}, cpf {string}, and email {string}",
  async function (studentId, name, cpf, email) {
    this.lastResponse = await requestJson("PUT", `/students/${studentId}`, {
      name,
      cpf,
      email,
    });
  }
);

When("I delete missing student id {string}", async function (studentId) {
  this.lastResponse = await requestJson("DELETE", `/students/${studentId}`);
});

Then("the response status should be {int}", function (expectedStatus) {
  assert.equal(this.lastResponse?.status, expectedStatus);
});

Then("the response body should be a students array", function () {
  assert.ok(Array.isArray(this.lastResponse?.body));
});

Then(
  "the response should include student data with name {string}, cpf {string}, and email {string}",
  function (expectedName, expectedCpf, expectedEmail) {
    assert.equal(typeof this.lastResponse?.body, "object");
    assert.ok(this.lastResponse.body);
    assert.equal(typeof this.lastResponse.body.id, "string");
    assert.ok(this.lastResponse.body.id.length > 0);
    assert.equal(this.lastResponse.body.name, expectedName);
    assert.equal(this.lastResponse.body.cpf, expectedCpf);
    assert.equal(this.lastResponse.body.email, expectedEmail);
  }
);

Then("the response should include a conflict on field {string}", function (fieldName) {
  assert.equal(typeof this.lastResponse?.body, "object");
  assert.ok(Array.isArray(this.lastResponse.body?.errors));

  const hasFieldConflict = this.lastResponse.body.errors.some(
    (issue) => issue && issue.field === fieldName
  );

  assert.equal(hasFieldConflict, true);
});

Then("the response should include message {string}", function (expectedMessage) {
  assert.equal(typeof this.lastResponse?.body, "object");
  assert.equal(this.lastResponse.body?.message, expectedMessage);
});

Then("the student list should not contain the last student id", function () {
  assert.ok(Array.isArray(this.lastResponse?.body));
  assert.ok(this.lastStudentId, "Expected an existing student id for list assertion.");

  const found = this.lastResponse.body.some((student) => student.id === this.lastStudentId);
  assert.equal(found, false);
});
