import { Student } from "../../shared/types/domain";
import {
  createStudent,
  deleteStudentById,
  listStudents,
  updateStudentById,
} from "./student.repository";
import {
  ValidationIssue,
  validateStudentPayload,
  type StudentPayloadInput,
} from "./student.validation";

interface ConflictIssue {
  field: "cpf" | "email";
  message: string;
}

type InvalidPayloadResult = {
  ok: false;
  kind: "invalid-payload";
  errors: ValidationIssue[];
};

type ConflictResult = {
  ok: false;
  kind: "conflict";
  errors: ConflictIssue[];
};

type NotFoundResult = {
  ok: false;
  kind: "not-found";
};

type CreateStudentServiceResult =
  | {
      ok: true;
      student: Student;
    }
  | InvalidPayloadResult
  | ConflictResult;

type UpdateStudentServiceResult =
  | {
      ok: true;
      student: Student;
    }
  | InvalidPayloadResult
  | ConflictResult
  | NotFoundResult;

type DeleteStudentServiceResult =
  | {
      ok: true;
    }
  | NotFoundResult;

const getConflictIssues = (
  students: Student[],
  payload: StudentPayloadInput,
  currentStudentId?: string
): ConflictIssue[] => {
  const normalizedCurrentId = currentStudentId ?? null;
  const hasCpfConflict = students.some(
    (student) => student.cpf === payload.cpf && student.id !== normalizedCurrentId
  );
  const hasEmailConflict = students.some(
    (student) => student.email === payload.email && student.id !== normalizedCurrentId
  );

  const conflicts: ConflictIssue[] = [];

  if (hasCpfConflict) {
    conflicts.push({
      field: "cpf",
      message: "Field 'cpf' is already in use.",
    });
  }

  if (hasEmailConflict) {
    conflicts.push({
      field: "email",
      message: "Field 'email' is already in use.",
    });
  }

  return conflicts;
};

const createStudentWithValidation = async (
  payload: unknown
): Promise<CreateStudentServiceResult> => {
  const validation = validateStudentPayload(payload);

  if (!validation.isValid) {
    return {
      ok: false,
      kind: "invalid-payload",
      errors: validation.errors,
    };
  }

  const students = await listStudents();
  const conflicts = getConflictIssues(students, validation.data);

  if (conflicts.length > 0) {
    return {
      ok: false,
      kind: "conflict",
      errors: conflicts,
    };
  }

  const student = await createStudent(validation.data);

  return {
    ok: true,
    student,
  };
};

const updateStudentWithValidation = async (
  id: string,
  payload: unknown
): Promise<UpdateStudentServiceResult> => {
  const validation = validateStudentPayload(payload);

  if (!validation.isValid) {
    return {
      ok: false,
      kind: "invalid-payload",
      errors: validation.errors,
    };
  }

  const students = await listStudents();
  const studentToUpdate = students.find((student) => student.id === id);

  if (!studentToUpdate) {
    return {
      ok: false,
      kind: "not-found",
    };
  }

  const conflicts = getConflictIssues(students, validation.data, id);

  if (conflicts.length > 0) {
    return {
      ok: false,
      kind: "conflict",
      errors: conflicts,
    };
  }

  const student = await updateStudentById(id, validation.data);

  if (!student) {
    return {
      ok: false,
      kind: "not-found",
    };
  }

  return {
    ok: true,
    student,
  };
};

const deleteStudentWithValidation = async (
  id: string
): Promise<DeleteStudentServiceResult> => {
  const wasDeleted = await deleteStudentById(id);

  if (!wasDeleted) {
    return {
      ok: false,
      kind: "not-found",
    };
  }

  return {
    ok: true,
  };
};

export {
  createStudentWithValidation,
  deleteStudentWithValidation,
  updateStudentWithValidation,
};
