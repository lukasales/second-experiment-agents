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

const getClassById = async (id: string): Promise<ClassRoom | null> => {
  const classes = await readClassesFromFile();
  const classRoom = classes.find((item) => item.id === id);

  return classRoom ?? null;
};

interface UpdateClassAssessmentInput {
  classId: string;
  studentId: string;
  goal: string;
  concept: string;
}

const updateClassAssessment = async (
  input: UpdateClassAssessmentInput
): Promise<ClassRoom | null> => {
  const classes = await readClassesFromFile();
  const classIndex = classes.findIndex((classRoom) => classRoom.id === input.classId);

  if (classIndex === -1) {
    return null;
  }

  const classRoom = classes[classIndex];
  const currentAssessments =
    typeof classRoom.assessmentsByStudent === "object" &&
    classRoom.assessmentsByStudent !== null &&
    !Array.isArray(classRoom.assessmentsByStudent)
      ? (classRoom.assessmentsByStudent as Record<string, unknown>)
      : {};
  const currentStudentAssessments =
    typeof currentAssessments[input.studentId] === "object" &&
    currentAssessments[input.studentId] !== null &&
    !Array.isArray(currentAssessments[input.studentId])
      ? (currentAssessments[input.studentId] as Record<string, string>)
      : {};

  const updatedStudentAssessments: Record<string, string> = {
    ...currentStudentAssessments,
    [input.goal]: input.concept,
  };

  const updatedAssessmentsByStudent: Record<string, unknown> = {
    ...currentAssessments,
    [input.studentId]: updatedStudentAssessments,
  };

  const updatedClass: ClassRoom = {
    ...classRoom,
    assessmentsByStudent: updatedAssessmentsByStudent,
  };

  classes[classIndex] = updatedClass;
  await writeClassesToFile(classes);

  return updatedClass;
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

const updateClassById = async (
  id: string,
  input: CreateClassInput
): Promise<ClassRoom | null> => {
  const classes = await readClassesFromFile();
  const classIndex = classes.findIndex((classRoom) => classRoom.id === id);

  if (classIndex === -1) {
    return null;
  }

  const updatedClass: ClassRoom = {
    ...classes[classIndex],
    topic: input.topic,
    year: input.year,
    semester: input.semester,
    studentIds: input.studentIds,
    assessmentsByStudent: input.assessmentsByStudent,
  };

  classes[classIndex] = updatedClass;
  await writeClassesToFile(classes);

  return updatedClass;
};

const deleteClassById = async (id: string): Promise<boolean> => {
  const classes = await readClassesFromFile();
  const classIndex = classes.findIndex((classRoom) => classRoom.id === id);

  if (classIndex === -1) {
    return false;
  }

  classes.splice(classIndex, 1);
  await writeClassesToFile(classes);

  return true;
};

export { createClass, deleteClassById, listClasses, updateClassById };
export { getClassById, updateClassAssessment };
