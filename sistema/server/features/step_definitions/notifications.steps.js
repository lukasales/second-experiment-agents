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

const getTodayIsoDate = () => {
  return new Date().toISOString().slice(0, 10);
};

const createNotificationTestStudent = async (name, cpf, email) => {
  return requestJson("POST", "/students", {
    name,
    cpf,
    email,
  });
};

const createNotificationTestClass = async (topic, year, semester, studentId) => {
  return requestJson("POST", "/classes", {
    topic,
    year,
    semester,
    studentIds: [studentId],
    assessmentsByStudent: {},
  });
};

const findNotificationForToday = (notifications, studentId) => {
  const today = getTodayIsoDate();
  return notifications.find(
    (notification) => notification.studentId === studentId && notification.date === today
  );
};

Given("the notifications backend API is available", async function () {
  this.lastResponse = await requestJson("GET", "/notifications");
  assert.equal(this.lastResponse.status, 200);
  assert.ok(Array.isArray(this.lastResponse.body));

  this.notificationTestStudentId = null;
  this.notificationTestClassAId = null;
  this.notificationTestClassBId = null;
  this.notificationRecordForToday = null;
  this.notificationDispatchDate = null;
});

Given(
  "a notification test student exists with name {string}, cpf {string}, and email {string}",
  async function (name, cpf, email) {
    const response = await createNotificationTestStudent(name, cpf, email);

    assert.equal(response.status, 201);
    assert.equal(typeof response.body?.id, "string");

    this.notificationTestStudentId = response.body.id;
    this.lastResponse = response;
  }
);

Given(
  "a notification test class exists with topic {string}, year {int}, semester {int}, and enrolled notification test student",
  async function (topic, year, semester) {
    assert.ok(
      this.notificationTestStudentId,
      "Expected notification test student id before creating classes."
    );

    const response = await createNotificationTestClass(
      topic,
      year,
      semester,
      this.notificationTestStudentId
    );

    assert.equal(response.status, 201);
    assert.equal(typeof response.body?.id, "string");

    if (!this.notificationTestClassAId) {
      this.notificationTestClassAId = response.body.id;
    } else if (!this.notificationTestClassBId) {
      this.notificationTestClassBId = response.body.id;
    }

    this.lastClassId = response.body.id;
    this.lastResponse = response;
  }
);

When(
  "I update notification test assessment in class A with goal {string} and concept {string}",
  async function (goal, concept) {
    assert.ok(this.notificationTestClassAId, "Expected class A id before assessment updates.");

    this.lastResponse = await requestJson("PUT", "/assessments", {
      classId: this.notificationTestClassAId,
      studentId: this.notificationTestStudentId,
      goal,
      concept,
    });
  }
);

When(
  "I update notification test assessment in class B with goal {string} and concept {string}",
  async function (goal, concept) {
    assert.ok(this.notificationTestClassBId, "Expected class B id before assessment updates.");

    this.lastResponse = await requestJson("PUT", "/assessments", {
      classId: this.notificationTestClassBId,
      studentId: this.notificationTestStudentId,
      goal,
      concept,
    });
  }
);

When("I request the notifications list", async function () {
  this.lastResponse = await requestJson("GET", "/notifications");

  if (this.lastResponse.status === 200 && Array.isArray(this.lastResponse.body)) {
    this.notificationRecordForToday = findNotificationForToday(
      this.lastResponse.body,
      this.notificationTestStudentId
    );

    if (this.notificationRecordForToday) {
      this.notificationDispatchDate = this.notificationRecordForToday.date;
    }
  }
});

When("I run daily notifications dispatch for the captured notification date", async function () {
  assert.ok(
    this.notificationDispatchDate,
    "Expected a captured notification date before dispatch."
  );

  this.lastResponse = await requestJson("POST", "/notifications/daily-dispatch", {
    date: this.notificationDispatchDate,
  });
});

Then(
  "there should be exactly one notification record for the notification test student on today",
  function () {
    assert.ok(Array.isArray(this.lastResponse?.body));

    const today = getTodayIsoDate();
    const matches = this.lastResponse.body.filter(
      (notification) =>
        notification.studentId === this.notificationTestStudentId && notification.date === today
    );

    assert.equal(matches.length, 1);
    this.notificationRecordForToday = matches[0];
    this.notificationDispatchDate = matches[0].date;
  }
);

Then(
  "there should be exactly one pending notification record for the notification test student on today",
  function () {
    assert.ok(Array.isArray(this.lastResponse?.body));

    const today = getTodayIsoDate();
    const matches = this.lastResponse.body.filter(
      (notification) =>
        notification.studentId === this.notificationTestStudentId &&
        notification.date === today &&
        notification.sentAt === null
    );

    assert.equal(matches.length, 1);
    this.notificationRecordForToday = matches[0];
    this.notificationDispatchDate = matches[0].date;
  }
);

Then(
  "that daily notification should include class A goal {string} with concept {string}",
  function (goal, concept) {
    assert.ok(this.notificationRecordForToday, "Expected notification record for assertions.");

    const hasChange = this.notificationRecordForToday.changes.some(
      (change) =>
        change.classId === this.notificationTestClassAId &&
        change.goal === goal &&
        change.concept === concept
    );

    assert.equal(hasChange, true);
  }
);

Then(
  "that daily notification should include class B goal {string} with concept {string}",
  function (goal, concept) {
    assert.ok(this.notificationRecordForToday, "Expected notification record for assertions.");

    const hasChange = this.notificationRecordForToday.changes.some(
      (change) =>
        change.classId === this.notificationTestClassBId &&
        change.goal === goal &&
        change.concept === concept
    );

    assert.equal(hasChange, true);
  }
);

Then(
  "that daily notification should not include class A goal {string} with concept {string}",
  function (goal, concept) {
    assert.ok(this.notificationRecordForToday, "Expected notification record for assertions.");

    const hasChange = this.notificationRecordForToday.changes.some(
      (change) =>
        change.classId === this.notificationTestClassAId &&
        change.goal === goal &&
        change.concept === concept
    );

    assert.equal(hasChange, false);
  }
);

Then(
  "the dispatch result should report sent count {int} and failed count {int}",
  function (expectedSentCount, expectedFailedCount) {
    assert.equal(typeof this.lastResponse?.body, "object");
    assert.ok(this.lastResponse.body);
    assert.equal(this.lastResponse.body.date, this.notificationDispatchDate);
    assert.equal(this.lastResponse.body.sentCount, expectedSentCount);
    assert.equal(this.lastResponse.body.failedCount, expectedFailedCount);
  }
);

Then(
  "the notification record for the notification test student on today should be marked as sent",
  function () {
    assert.ok(Array.isArray(this.lastResponse?.body));

    const record = findNotificationForToday(this.lastResponse.body, this.notificationTestStudentId);

    assert.ok(record, "Expected notification record for student on today.");
    assert.equal(typeof record.sentAt, "string");
    assert.ok(record.sentAt.length > 0);
  }
);
