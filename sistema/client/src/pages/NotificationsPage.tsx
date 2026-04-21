import { useCallback, useEffect, useMemo, useState } from "react";
import { listClasses, ClassesApiError } from "../config/classesApi";
import {
  listNotifications,
  NotificationsApiError,
  runDailyDispatch,
} from "../config/notificationsApi";
import { listStudents, StudentsApiError } from "../config/studentsApi";
import type { ClassRoom, DailyNotification, Student } from "../types/domain";

const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (
    error instanceof NotificationsApiError ||
    error instanceof StudentsApiError ||
    error instanceof ClassesApiError
  ) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

const formatClassName = (classRoom: ClassRoom): string => {
  return `${classRoom.topic} (${classRoom.year}/${classRoom.semester})`;
};

const formatDateTime = (value: string | null): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.valueOf())) {
    return value;
  }

  return parsed.toLocaleString();
};

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<DailyNotification[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDispatching, setIsDispatching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const studentNameById = useMemo(() => {
    return new Map(students.map((student) => [student.id, student.name]));
  }, [students]);

  const classNameById = useMemo(() => {
    return new Map(classes.map((classRoom) => [classRoom.id, formatClassName(classRoom)]));
  }, [classes]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const [notificationsData, studentsData, classesData] = await Promise.all([
        listNotifications(),
        listStudents(),
        listClasses(),
      ]);

      setNotifications(notificationsData);
      setStudents(studentsData);
      setClasses(classesData);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to load notifications data."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRunDispatch = useCallback(async () => {
    setIsDispatching(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await runDailyDispatch();
      await loadData();

      setSuccessMessage(
        `Dispatch finished for ${result.date}. Sent: ${result.sentCount}. Failed: ${result.failedCount}.`
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to run daily dispatch."));
    } finally {
      setIsDispatching(false);
    }
  }, [loadData]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return (
    <section className="page-card notifications-page">
      <header className="notifications-page__header">
        <h2>Notifications</h2>
        <p>
          Daily consolidated notifications generated from assessment updates.
        </p>
      </header>

      <div className="notifications-page__actions">
        <button
          type="button"
          className="notifications-page__dispatch-button"
          onClick={() => {
            void handleRunDispatch();
          }}
          disabled={isLoading || isDispatching}
        >
          {isDispatching ? "Running dispatch..." : "Run daily dispatch"}
        </button>
      </div>

      {isLoading && (
        <p className="notifications-page__status notifications-page__status--loading" role="status">
          Loading notifications...
        </p>
      )}

      {errorMessage && (
        <p className="notifications-page__status notifications-page__status--error" role="alert">
          {errorMessage}
        </p>
      )}

      {successMessage && !isDispatching && (
        <p className="notifications-page__status notifications-page__status--success" role="status">
          {successMessage}
        </p>
      )}

      {!isLoading && notifications.length === 0 && !errorMessage && (
        <div className="notifications-page__empty-state" role="status">
          <p>No notifications found.</p>
          <p>
            Update at least one assessment and then run daily dispatch to see
            results here.
          </p>
        </div>
      )}

      {!isLoading && notifications.length > 0 && (
        <div className="notifications-page__list" aria-busy={isDispatching}>
          {notifications.map((notification) => {
            const studentName =
              studentNameById.get(notification.studentId) ?? notification.studentId;
            const statusLabel = notification.sentAt ? "Sent" : "Pending";

            return (
              <article key={notification.id} className="notifications-page__card">
                <header className="notifications-page__card-header">
                  <h3>{studentName}</h3>
                  <span
                    className={
                      notification.sentAt
                        ? "notifications-page__status-pill notifications-page__status-pill--sent"
                        : "notifications-page__status-pill notifications-page__status-pill--pending"
                    }
                  >
                    {statusLabel}
                  </span>
                </header>

                <dl className="notifications-page__meta">
                  <div>
                    <dt>Date</dt>
                    <dd>{notification.date}</dd>
                  </div>
                  <div>
                    <dt>Sent At</dt>
                    <dd>{formatDateTime(notification.sentAt)}</dd>
                  </div>
                </dl>

                <div className="notifications-page__changes">
                  <h4>Consolidated changes</h4>
                  <table className="notifications-page__changes-table">
                    <thead>
                      <tr>
                        <th scope="col">Class</th>
                        <th scope="col">Goal</th>
                        <th scope="col">Concept</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notification.changes.map((change, index) => (
                        <tr key={`${notification.id}-${change.classId}-${change.goal}-${index}`}>
                          <td>{classNameById.get(change.classId) ?? change.classId}</td>
                          <td>{change.goal}</td>
                          <td>{change.concept}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
