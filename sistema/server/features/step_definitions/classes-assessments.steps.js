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

const parseStudentIds = (value) => {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const createClass = async (topic, year, semester, studentIdsRaw) => {
  return requestJson("POST", "/classes", {
    topic,
    year,
    semester,
    studentIds: parseStudentIds(studentIdsRaw),
    assessmentsByStudent: {},
  });
};

Given("the classes backend API is available", async function () {
  this.lastResponse = await requestJson("GET", "/classes");
  assert.equal(this.lastResponse.status, 200);
  assert.ok(Array.isArray(this.lastResponse.body));
});

Given(
  "a class exists with topic {string}, year {int}, semester {int}, and student ids {string}",
  async function (topic, year, semester, studentIdsRaw) {
    const response = await createClass(topic, year, semester, studentIdsRaw);

    assert.equal(response.status, 201);
    assert.equal(typeof response.body?.id, "string");

    this.lastClassId = response.body.id;
    this.lastResponse = response;
  }
);

When("I request the classes list", async function () {
  this.lastResponse = await requestJson("GET", "/classes");
});

When(
  "I create a class with topic {string}, year {int}, semester {int}, and student ids {string}",
  async function (topic, year, semester, studentIdsRaw) {
    this.lastResponse = await createClass(topic, year, semester, studentIdsRaw);

    if (this.lastResponse.status === 201 && this.lastResponse.body?.id) {
      this.lastClassId = this.lastResponse.body.id;
    }
  }
);

When(
  "I update that class with topic {string}, year {int}, semester {int}, and student ids {string}",
  async function (topic, year, semester, studentIdsRaw) {
    assert.ok(this.lastClassId, "Expected an existing class id before update.");

    this.lastResponse = await requestJson("PUT", `/classes/${this.lastClassId}`, {
      topic,
      year,
      semester,
      studentIds: parseStudentIds(studentIdsRaw),
      assessmentsByStudent: {},
    });
  }
);

When("I delete that class", async function () {
  assert.ok(this.lastClassId, "Expected an existing class id before delete.");
  this.lastResponse = await requestJson("DELETE", `/classes/${this.lastClassId}`);
});

When("I request assessments for that class", async function () {
  assert.ok(this.lastClassId, "Expected an existing class id before loading assessments.");
  this.lastResponse = await requestJson("GET", `/assessments/class/${this.lastClassId}`);
});

When("I request assessments for missing class id {string}", async function (classId) {
  this.lastResponse = await requestJson("GET", `/assessments/class/${classId}`);
});

When(
  "I update assessment for that class with student id {string}, goal {string}, and concept {string}",
  async function (studentId, goal, concept) {
    assert.ok(this.lastClassId, "Expected an existing class id before updating assessment.");

    this.lastResponse = await requestJson("PUT", "/assessments", {
      classId: this.lastClassId,
      studentId,
      goal,
      concept,
    });
  }
);

Then("the response body should be a classes array", function () {
  assert.ok(Array.isArray(this.lastResponse?.body));
});

Then(
  "the response should include class data with topic {string}, year {int}, semester {int}, and student ids {string}",
  function (expectedTopic, expectedYear, expectedSemester, expectedStudentIdsRaw) {
    const expectedStudentIds = parseStudentIds(expectedStudentIdsRaw);

    assert.equal(typeof this.lastResponse?.body, "object");
    assert.ok(this.lastResponse.body);
    assert.equal(typeof this.lastResponse.body.id, "string");
    assert.ok(this.lastResponse.body.id.length > 0);
    assert.equal(this.lastResponse.body.topic, expectedTopic);
    assert.equal(this.lastResponse.body.year, expectedYear);
    assert.equal(this.lastResponse.body.semester, expectedSemester);
    assert.deepEqual(this.lastResponse.body.studentIds, expectedStudentIds);
    assert.equal(typeof this.lastResponse.body.assessmentsByStudent, "object");
  }
);

Then("the classes list should not contain the last class id", function () {
  assert.ok(Array.isArray(this.lastResponse?.body));
  assert.ok(this.lastClassId, "Expected an existing class id for list assertion.");

  const found = this.lastResponse.body.some((classRoom) => classRoom.id === this.lastClassId);
  assert.equal(found, false);
});

Then("the response should include assessments payload for that class", function () {
  assert.equal(typeof this.lastResponse?.body, "object");
  assert.ok(this.lastResponse.body);
  assert.equal(this.lastResponse.body.classId, this.lastClassId);
  assert.equal(typeof this.lastResponse.body.assessmentsByStudent, "object");
});

Then(
  "the response should include assessment update for student id {string}, goal {string}, and concept {string}",
  function (expectedStudentId, expectedGoal, expectedConcept) {
    assert.equal(typeof this.lastResponse?.body, "object");
    assert.ok(this.lastResponse.body);
    assert.equal(this.lastResponse.body.classId, this.lastClassId);
    assert.equal(this.lastResponse.body.studentId, expectedStudentId);
    assert.equal(this.lastResponse.body.goal, expectedGoal);
    assert.equal(this.lastResponse.body.concept, expectedConcept);
  }
);

Then(
  "the assessments payload should include concept {string} for student id {string} and goal {string}",
  function (expectedConcept, studentId, goal) {
    assert.equal(typeof this.lastResponse?.body, "object");
    assert.ok(this.lastResponse.body);

    const byStudent = this.lastResponse.body.assessmentsByStudent;

    assert.equal(typeof byStudent, "object");
    assert.ok(byStudent);
    assert.equal(typeof byStudent[studentId], "object");
    assert.ok(byStudent[studentId]);
    assert.equal(byStudent[studentId][goal], expectedConcept);
  }
);

Then("the response should include a validation issue on field {string}", function (fieldName) {
  assert.equal(typeof this.lastResponse?.body, "object");
  assert.ok(Array.isArray(this.lastResponse.body?.errors));

  const hasFieldIssue = this.lastResponse.body.errors.some(
    (issue) => issue && issue.field === fieldName
  );

  assert.equal(hasFieldIssue, true);
});
