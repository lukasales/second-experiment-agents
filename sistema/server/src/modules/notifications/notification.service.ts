import { randomUUID } from "node:crypto";
import {
  AssessmentConcept,
  ClassRoom,
  DailyNotification,
  DailyNotificationChange,
  Student,
} from "../../shared/types/domain";
import { listClasses } from "../classes/class.repository";
import { listStudents } from "../students/student.repository";
import { createNotificationMailer } from "./notification.mailer";
import { listNotifications, saveNotifications } from "./notification.repository";

interface RecordAssessmentNotificationInput {
  studentId: string;
  classId: string;
  goal: string;
  concept: AssessmentConcept;
}

interface DispatchDailyNotificationsInput {
  date?: string;
}

interface DispatchAttemptResult {
  notificationId: string;
  studentId: string;
  status: "sent" | "failed";
  reason?: string;
}

interface DispatchDailyNotificationsResult {
  date: string;
  totalPending: number;
  sentCount: number;
  failedCount: number;
  attempts: DispatchAttemptResult[];
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const getCurrentDate = (): string => {
  return new Date().toISOString().slice(0, 10);
};

const isValidDateString = (date: string): boolean => {
  if (!DATE_PATTERN.test(date)) {
    return false;
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf());
};

const normalizeDispatchDate = (date?: string): string => {
  if (!date) {
    return getCurrentDate();
  }

  if (!isValidDateString(date)) {
    throw new Error("Invalid date. Expected format: YYYY-MM-DD.");
  }

  return date;
};

const upsertChange = (
  changes: DailyNotificationChange[],
  incomingChange: DailyNotificationChange
): DailyNotificationChange[] => {
  const existingIndex = changes.findIndex(
    (change) =>
      change.classId === incomingChange.classId && change.goal === incomingChange.goal
  );

  if (existingIndex === -1) {
    return [...changes, incomingChange];
  }

  const updatedChanges = [...changes];
  updatedChanges[existingIndex] = incomingChange;
  return updatedChanges;
};

const upsertDailyNotification = (
  notifications: DailyNotification[],
  input: RecordAssessmentNotificationInput,
  date: string
): DailyNotification[] => {
  const existingRecordIndex = notifications.findIndex(
    (notification) =>
      notification.studentId === input.studentId && notification.date === date
  );

  const nextChange: DailyNotificationChange = {
    classId: input.classId,
    goal: input.goal,
    concept: input.concept,
  };

  if (existingRecordIndex === -1) {
    return [
      ...notifications,
      {
        id: randomUUID(),
        studentId: input.studentId,
        date,
        changes: [nextChange],
        sentAt: null,
      },
    ];
  }

  const updatedNotifications = [...notifications];
  const existingRecord = updatedNotifications[existingRecordIndex];

  updatedNotifications[existingRecordIndex] = {
    ...existingRecord,
    changes: upsertChange(existingRecord.changes, nextChange),
  };

  return updatedNotifications;
};

const recordAssessmentNotificationChange = async (
  input: RecordAssessmentNotificationInput
): Promise<void> => {
  const notifications = await listNotifications();
  const date = getCurrentDate();
  const updatedNotifications = upsertDailyNotification(notifications, input, date);

  await saveNotifications(updatedNotifications);
};

const buildStudentById = (students: Student[]): Map<string, Student> => {
  return new Map(students.map((student) => [student.id, student]));
};

const buildClassById = (classes: ClassRoom[]): Map<string, ClassRoom> => {
  return new Map(classes.map((classRoom) => [classRoom.id, classRoom]));
};

const buildEmailBody = (
  notification: DailyNotification,
  classById: Map<string, ClassRoom>
): string => {
  const header = [
    "Your daily assessment updates are listed below:",
    "",
    `Date: ${notification.date}`,
    "",
  ];

  const lines = notification.changes.map((change, index) => {
    const classRoom = classById.get(change.classId);
    const classLabel = classRoom
      ? `${classRoom.topic} (${classRoom.year}.${classRoom.semester})`
      : change.classId;

    return [
      `${index + 1}. Class: ${classLabel}`,
      `   Goal: ${change.goal}`,
      `   Concept: ${change.concept}`,
    ].join("\n");
  });

  return [...header, ...lines].join("\n");
};

const markNotificationsAsSent = (
  notifications: DailyNotification[],
  sentNotificationIds: Set<string>,
  sentAt: string
): DailyNotification[] => {
  return notifications.map((notification) => {
    if (!sentNotificationIds.has(notification.id)) {
      return notification;
    }

    return {
      ...notification,
      sentAt,
    };
  });
};

const dispatchDailyNotifications = async (
  input: DispatchDailyNotificationsInput = {}
): Promise<DispatchDailyNotificationsResult> => {
  const dispatchDate = normalizeDispatchDate(input.date);
  const notifications = await listNotifications();
  const pendingNotifications = notifications.filter(
    (notification) => notification.date === dispatchDate && notification.sentAt === null
  );

  if (pendingNotifications.length === 0) {
    return {
      date: dispatchDate,
      totalPending: 0,
      sentCount: 0,
      failedCount: 0,
      attempts: [],
    };
  }

  const [students, classes] = await Promise.all([listStudents(), listClasses()]);
  const studentById = buildStudentById(students);
  const classById = buildClassById(classes);
  const mailer = createNotificationMailer();

  const attempts: DispatchAttemptResult[] = [];
  const sentNotificationIds = new Set<string>();

  for (const notification of pendingNotifications) {
    const student = studentById.get(notification.studentId);

    if (!student) {
      attempts.push({
        notificationId: notification.id,
        studentId: notification.studentId,
        status: "failed",
        reason: "Student not found.",
      });
      continue;
    }

    const emailBody = buildEmailBody(notification, classById);

    try {
      await mailer.sendEmail({
        to: student.email,
        subject: `Daily assessment updates - ${dispatchDate}`,
        text: emailBody,
      });

      sentNotificationIds.add(notification.id);
      attempts.push({
        notificationId: notification.id,
        studentId: notification.studentId,
        status: "sent",
      });
    } catch {
      attempts.push({
        notificationId: notification.id,
        studentId: notification.studentId,
        status: "failed",
        reason: "Email dispatch failed.",
      });
    }
  }

  if (sentNotificationIds.size > 0) {
    const sentAt = new Date().toISOString();
    const updatedNotifications = markNotificationsAsSent(
      notifications,
      sentNotificationIds,
      sentAt
    );

    await saveNotifications(updatedNotifications);
  }

  const sentCount = attempts.filter((attempt) => attempt.status === "sent").length;

  return {
    date: dispatchDate,
    totalPending: pendingNotifications.length,
    sentCount,
    failedCount: attempts.length - sentCount,
    attempts,
  };
};

const listNotificationsForDisplay = async (): Promise<DailyNotification[]> => {
  const notifications = await listNotifications();

  return [...notifications].sort((left, right) => {
    if (left.date !== right.date) {
      return right.date.localeCompare(left.date);
    }

    const leftSentAt = left.sentAt ?? "";
    const rightSentAt = right.sentAt ?? "";

    if (leftSentAt !== rightSentAt) {
      return rightSentAt.localeCompare(leftSentAt);
    }

    return right.id.localeCompare(left.id);
  });
};

export {
  dispatchDailyNotifications,
  listNotificationsForDisplay,
  recordAssessmentNotificationChange,
};
export type {
  DispatchDailyNotificationsResult,
  RecordAssessmentNotificationInput,
};
