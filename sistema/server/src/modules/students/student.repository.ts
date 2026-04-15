import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Student } from "../../shared/types/domain";
import { CreateStudentInput } from "./student.validation";

const studentsDataFilePath = path.resolve(process.cwd(), "data", "students.json");

const ensureStudentsDataFile = async (): Promise<void> => {
  try {
    await fs.access(studentsDataFilePath);
  } catch {
    await fs.mkdir(path.dirname(studentsDataFilePath), { recursive: true });
    await fs.writeFile(studentsDataFilePath, "[]\n", "utf-8");
  }
};

const readStudentsFromFile = async (): Promise<Student[]> => {
  await ensureStudentsDataFile();

  const rawFileContent = await fs.readFile(studentsDataFilePath, "utf-8");
  const parsedContent = JSON.parse(rawFileContent) as unknown;

  if (!Array.isArray(parsedContent)) {
    throw new Error("Invalid students data format.");
  }

  return parsedContent as Student[];
};

const writeStudentsToFile = async (students: Student[]): Promise<void> => {
  await fs.writeFile(studentsDataFilePath, `${JSON.stringify(students, null, 2)}\n`, "utf-8");
};

const listStudents = async (): Promise<Student[]> => {
  return readStudentsFromFile();
};

const createStudent = async (input: CreateStudentInput): Promise<Student> => {
  const students = await readStudentsFromFile();

  const newStudent: Student = {
    id: randomUUID(),
    name: input.name,
    cpf: input.cpf,
    email: input.email,
  };

  students.push(newStudent);
  await writeStudentsToFile(students);

  return newStudent;
};

const updateStudentById = async (
  id: string,
  input: CreateStudentInput
): Promise<Student | null> => {
  const students = await readStudentsFromFile();
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return null;
  }

  const updatedStudent: Student = {
    ...students[studentIndex],
    name: input.name,
    cpf: input.cpf,
    email: input.email,
  };

  students[studentIndex] = updatedStudent;
  await writeStudentsToFile(students);

  return updatedStudent;
};

export { createStudent, listStudents, updateStudentById };