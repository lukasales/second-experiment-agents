const { AfterAll, Before, BeforeAll } = require("@cucumber/cucumber");
const fs = require("node:fs/promises");
const path = require("node:path");

const studentsDataFilePath = path.resolve(process.cwd(), "data", "students.json");
const baselineStudents = [];
let originalStudentsDataFileContent = null;

BeforeAll(async function () {
  await fs.mkdir(path.dirname(studentsDataFilePath), { recursive: true });

  try {
    originalStudentsDataFileContent = await fs.readFile(studentsDataFilePath, "utf-8");
  } catch {
    originalStudentsDataFileContent = "[]\n";
    await fs.writeFile(studentsDataFilePath, originalStudentsDataFileContent, "utf-8");
  }
});

Before(async function () {
  await fs.mkdir(path.dirname(studentsDataFilePath), { recursive: true });

  await fs.writeFile(
    studentsDataFilePath,
    `${JSON.stringify(baselineStudents, null, 2)}\n`,
    "utf-8"
  );

  this.lastResponse = null;
  this.lastStudentId = null;
});

AfterAll(async function () {
  if (originalStudentsDataFileContent === null) {
    return;
  }

  await fs.writeFile(studentsDataFilePath, originalStudentsDataFileContent, "utf-8");
});
