import { getApiUrl } from "./api";
import type { ClassRoom } from "../types/domain";

interface ClassApiErrorIssue {
  field: string;
  message: string;
}

interface ClassApiErrorResponse {
  message?: string;
  errors?: ClassApiErrorIssue[];
}

export interface CreateClassPayload {
  topic: string;
  year: number;
  semester: number;
  studentIds: string[];
  assessmentsByStudent: Record<string, unknown>;
}

export class ClassesApiError extends Error {
  status: number;

  issues: ClassApiErrorIssue[];

  constructor(message: string, status: number, issues: ClassApiErrorIssue[] = []) {
    super(message);
    this.name = "ClassesApiError";
    this.status = status;
    this.issues = issues;
  }
}

const getSafeErrorMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const response = payload as ClassApiErrorResponse;
  return typeof response.message === "string" ? response.message : undefined;
};

const getSafeErrorIssues = (payload: unknown): ClassApiErrorIssue[] => {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const response = payload as ClassApiErrorResponse;
  if (!Array.isArray(response.errors)) {
    return [];
  }

  return response.errors.filter(
    (issue): issue is ClassApiErrorIssue =>
      typeof issue?.field === "string" && typeof issue?.message === "string"
  );
};

const hasJsonResponseBody = (response: Response): boolean => {
  if (response.status === 204) {
    return false;
  }

  const contentType = response.headers.get("content-type");
  return typeof contentType === "string" && contentType.includes("application/json");
};

const parseApiResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    if (!hasJsonResponseBody(response)) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = undefined;
  }

  const fallbackMessage = `Request failed with status ${response.status}.`;
  throw new ClassesApiError(
    getSafeErrorMessage(payload) ?? fallbackMessage,
    response.status,
    getSafeErrorIssues(payload)
  );
};

const requestClassesApi = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(getApiUrl(path), init);
  return parseApiResponse<T>(response);
};

export const listClasses = async (): Promise<ClassRoom[]> => {
  return requestClassesApi<ClassRoom[]>("/classes");
};

export const createClass = async (payload: CreateClassPayload): Promise<ClassRoom> => {
  return requestClassesApi<ClassRoom>("/classes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const updateClass = async (
  classId: string,
  payload: CreateClassPayload
): Promise<ClassRoom> => {
  return requestClassesApi<ClassRoom>(`/classes/${classId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const deleteClass = async (classId: string): Promise<void> => {
  return requestClassesApi<void>(`/classes/${classId}`, {
    method: "DELETE",
  });
};