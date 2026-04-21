import { getApiUrl } from "./api";
import type { DailyNotification } from "../types/domain";

interface NotificationsApiErrorResponse {
  message?: string;
}

interface DispatchDailyNotificationsResult {
  date: string;
  totalPending: number;
  sentCount: number;
  failedCount: number;
  attempts: Array<{
    notificationId: string;
    studentId: string;
    status: "sent" | "failed";
    reason?: string;
  }>;
}

export class NotificationsApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "NotificationsApiError";
    this.status = status;
  }
}

const getSafeErrorMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const response = payload as NotificationsApiErrorResponse;
  return typeof response.message === "string" ? response.message : undefined;
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
  throw new NotificationsApiError(
    getSafeErrorMessage(payload) ?? fallbackMessage,
    response.status
  );
};

const requestNotificationsApi = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(getApiUrl(path), init);
  return parseApiResponse<T>(response);
};

export const listNotifications = async (): Promise<DailyNotification[]> => {
  return requestNotificationsApi<DailyNotification[]>("/notifications");
};

export const runDailyDispatch = async (date?: string): Promise<DispatchDailyNotificationsResult> => {
  const body = date ? { date } : {};

  return requestNotificationsApi<DispatchDailyNotificationsResult>(
    "/notifications/daily-dispatch",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
};
