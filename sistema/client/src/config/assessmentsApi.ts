import { getApiUrl } from "./api";

interface AssessmentsApiErrorIssue {
  field: string;
  message: string;
}

interface AssessmentsApiErrorResponse {
  message?: string;
  errors?: AssessmentsApiErrorIssue[];
}

export interface ClassAssessmentsResponse {
  classId: string;
  assessmentsByStudent: Record<string, unknown>;
}

export interface UpdateAssessmentRequest {
  classId: string;
  studentId: string;
  goal: string;
  concept: "MANA" | "MPA" | "MA";
}

export class AssessmentsApiError extends Error {
  status: number;
  issues: AssessmentsApiErrorIssue[];

  constructor(message: string, status: number, issues: AssessmentsApiErrorIssue[] = []) {
    super(message);
    this.name = "AssessmentsApiError";
    this.status = status;
    this.issues = issues;
  }
}

const getSafeErrorMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const response = payload as AssessmentsApiErrorResponse;
  return typeof response.message === "string" ? response.message : undefined;
};

const getSafeErrorIssues = (payload: unknown): AssessmentsApiErrorIssue[] => {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const response = payload as AssessmentsApiErrorResponse;
  if (!Array.isArray(response.errors)) {
    return [];
  }

  return response.errors.filter(
    (issue): issue is AssessmentsApiErrorIssue =>
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
  throw new AssessmentsApiError(
    getSafeErrorMessage(payload) ?? fallbackMessage,
    response.status,
    getSafeErrorIssues(payload)
  );
};

const requestAssessmentsApi = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(getApiUrl(path), init);
  return parseApiResponse<T>(response);
};

export const getClassAssessments = async (classId: string): Promise<ClassAssessmentsResponse> => {
  return requestAssessmentsApi<ClassAssessmentsResponse>(`/assessments/class/${classId}`);
};

export const updateAssessment = async (payload: UpdateAssessmentRequest): Promise<void> => {
  return requestAssessmentsApi<void>("/assessments", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};