const assert = require("node:assert/strict");
const { When, Then } = require("@cucumber/cucumber");

const apiBaseUrl = process.env.STUDENTS_API_BASE_URL ?? "http://localhost:3001/api";

const requestJson = async (url) => {
  const response = await fetch(url);
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

When("I request the backend health endpoint", async function () {
  this.lastResponse = await requestJson(`${apiBaseUrl}/health`);
});

When("I request the backend root endpoint", async function () {
  const rootBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");
  this.lastResponse = await requestJson(rootBaseUrl || apiBaseUrl);
});

Then(
  "the health payload should report status {string} and service {string}",
  function (expectedStatus, expectedService) {
    assert.equal(typeof this.lastResponse?.body, "object");
    assert.ok(this.lastResponse.body);
    assert.equal(this.lastResponse.body.status, expectedStatus);
    assert.equal(this.lastResponse.body.service, expectedService);
  }
);

Then("the root payload should include message {string}", function (expectedMessage) {
  assert.equal(typeof this.lastResponse?.body, "object");
  assert.ok(this.lastResponse.body);
  assert.equal(this.lastResponse.body.message, expectedMessage);
});
