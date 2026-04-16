import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { ClassRoom } from "../../shared/types/domain";
import { CreateClassInput } from "./class.validation";

const classesDataFilePath = path.resolve(process.cwd(), "data", "classes.json");

const ensureClassesDataFile = async (): Promise<void> => {
  try {
    await fs.access(classesDataFilePath);
  } catch {
    await fs.mkdir(path.dirname(classesDataFilePath), { recursive: true });
    await fs.writeFile(classesDataFilePath, "[]\n", "utf-8");
  }
};

const readClassesFromFile = async (): Promise<ClassRoom[]> => {
  await ensureClassesDataFile();

  const rawFileContent = await fs.readFile(classesDataFilePath, "utf-8");
  const parsedContent = JSON.parse(rawFileContent) as unknown;

  if (!Array.isArray(parsedContent)) {
    throw new Error("Invalid classes data format.");
  }

  return parsedContent as ClassRoom[];
};

const writeClassesToFile = async (classes: ClassRoom[]): Promise<void> => {
  await fs.writeFile(classesDataFilePath, `${JSON.stringify(classes, null, 2)}\n`, "utf-8");
};

const listClasses = async (): Promise<ClassRoom[]> => {
  return readClassesFromFile();
};

const createClass = async (input: CreateClassInput): Promise<ClassRoom> => {
  const classes = await readClassesFromFile();

  const newClass: ClassRoom = {
    id: randomUUID(),
    topic: input.topic,
    year: input.year,
    semester: input.semester,
    studentIds: input.studentIds,
    assessmentsByStudent: input.assessmentsByStudent,
  };

  classes.push(newClass);
  await writeClassesToFile(classes);

  return newClass;
};

export { createClass, listClasses };
