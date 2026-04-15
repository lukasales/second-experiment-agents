import { getApiUrl } from "./api";
import type { Student } from "../types/domain";

interface StudentApiErrorIssue {
  field: string;
  message: string;
}

interface StudentApiErrorResponse {
  message?: string;
  errors?: StudentApiErrorIssue[];
}

export interface CreateStudentPayload {
  name: string;
  cpf: string;
  email: string;
}

export type UpdateStudentPayload = CreateStudentPayload;

export class StudentsApiError extends Error {
  status: number;
  issues: StudentApiErrorIssue[];

  constructor(message: string, status: number, issues: StudentApiErrorIssue[] = []) {
    super(message);
    this.name = "StudentsApiError";
    this.status = status;
    this.issues = issues;
  }
}

const getSafeErrorMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const response = payload as StudentApiErrorResponse;
  return typeof response.message === "string" ? response.message : undefined;
};

const getSafeErrorIssues = (payload: unknown): StudentApiErrorIssue[] => {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const response = payload as StudentApiErrorResponse;
  if (!Array.isArray(response.errors)) {
    return [];
  }

  return response.errors.filter(
    (issue): issue is StudentApiErrorIssue =>
      typeof issue?.field === "string" && typeof issue?.message === "string"
  );
};

const parseApiResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return (await response.json()) as T;
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = undefined;
  }

  const fallbackMessage = `Request failed with status ${response.status}.`;
  throw new StudentsApiError(
    getSafeErrorMessage(payload) ?? fallbackMessage,
    response.status,
    getSafeErrorIssues(payload)
  );
};

const requestStudentsApi = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(getApiUrl(path), init);
  return parseApiResponse<T>(response);
};

const requestStudentWithPayload = async (
  method: "POST" | "PUT",
  path: string,
  payload: CreateStudentPayload
): Promise<Student> => {
  return requestStudentsApi<Student>(path, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const listStudents = async (): Promise<Student[]> => {
  return requestStudentsApi<Student[]>("/students");
};

export const createStudent = async (payload: CreateStudentPayload): Promise<Student> => {
  return requestStudentWithPayload("POST", "/students", payload);
};

export const updateStudent = async (
  id: string,
  payload: UpdateStudentPayload
): Promise<Student> => {
  return requestStudentWithPayload("PUT", `/students/${id}`, payload);
};