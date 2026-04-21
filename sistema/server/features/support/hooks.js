const { AfterAll, Before, BeforeAll } = require("@cucumber/cucumber");
const fs = require("node:fs/promises");
const path = require("node:path");

const studentsDataFilePath = path.resolve(process.cwd(), "data", "students.json");
const classesDataFilePath = path.resolve(process.cwd(), "data", "classes.json");
const notificationsDataFilePath = path.resolve(process.cwd(), "data", "notifications.json");
const baselineStudents = [];
const baselineClasses = [];
const baselineNotifications = [];
let originalStudentsDataFileContent = null;
let originalClassesDataFileContent = null;
let originalNotificationsDataFileContent = null;

BeforeAll(async function () {
  await fs.mkdir(path.dirname(studentsDataFilePath), { recursive: true });
  await fs.mkdir(path.dirname(classesDataFilePath), { recursive: true });
  await fs.mkdir(path.dirname(notificationsDataFilePath), { recursive: true });

  try {
    originalStudentsDataFileContent = await fs.readFile(studentsDataFilePath, "utf-8");
  } catch {
    originalStudentsDataFileContent = "[]\n";
    await fs.writeFile(studentsDataFilePath, originalStudentsDataFileContent, "utf-8");
  }

  try {
    originalClassesDataFileContent = await fs.readFile(classesDataFilePath, "utf-8");
  } catch {
    originalClassesDataFileContent = "[]\n";
    await fs.writeFile(classesDataFilePath, originalClassesDataFileContent, "utf-8");
  }

  try {
    originalNotificationsDataFileContent = await fs.readFile(notificationsDataFilePath, "utf-8");
  } catch {
    originalNotificationsDataFileContent = "[]\n";
    await fs.writeFile(notificationsDataFilePath, originalNotificationsDataFileContent, "utf-8");
  }
});

Before(async function () {
  await fs.mkdir(path.dirname(studentsDataFilePath), { recursive: true });
  await fs.mkdir(path.dirname(classesDataFilePath), { recursive: true });
  await fs.mkdir(path.dirname(notificationsDataFilePath), { recursive: true });

  await fs.writeFile(
    studentsDataFilePath,
    `${JSON.stringify(baselineStudents, null, 2)}\n`,
    "utf-8"
  );

  await fs.writeFile(
    classesDataFilePath,
    `${JSON.stringify(baselineClasses, null, 2)}\n`,
    "utf-8"
  );

  await fs.writeFile(
    notificationsDataFilePath,
    `${JSON.stringify(baselineNotifications, null, 2)}\n`,
    "utf-8"
  );

  this.lastResponse = null;
  this.lastStudentId = null;
  this.lastClassId = null;
});

AfterAll(async function () {
  if (originalStudentsDataFileContent !== null) {
    await fs.writeFile(studentsDataFilePath, originalStudentsDataFileContent, "utf-8");
  }

  if (originalClassesDataFileContent !== null) {
    await fs.writeFile(classesDataFilePath, originalClassesDataFileContent, "utf-8");
  }

  if (originalNotificationsDataFileContent !== null) {
    await fs.writeFile(notificationsDataFilePath, originalNotificationsDataFileContent, "utf-8");
  }
});
