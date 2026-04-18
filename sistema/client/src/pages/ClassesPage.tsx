import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ClassesApiError,
  createClass,
  deleteClass,
  listClasses,
  type CreateClassPayload,
  updateClass,
} from "../config/classesApi";
import { StudentsApiError, listStudents } from "../config/studentsApi";
import type { ClassRoom, Student } from "../types/domain";

interface ClassFormState {
  topic: string;
  year: string;
  semester: string;
}

const EMPTY_FORM: ClassFormState = {
  topic: "",
  year: "",
  semester: "",
};

const toDisplayErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (error instanceof ClassesApiError) {
    if (error.issues.length > 0) {
      const details = error.issues.map((issue) => issue.message).join(" ");
      return `${error.message} ${details}`.trim();
    }

    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

const toDisplayStudentsErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (error instanceof StudentsApiError) {
    if (error.issues.length > 0) {
      const details = error.issues.map((issue) => issue.message).join(" ");
      return `${error.message} ${details}`.trim();
    }

    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

export function ClassesPage() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [form, setForm] = useState<ClassFormState>(EMPTY_FORM);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [areStudentsLoading, setAreStudentsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [studentsLoadError, setStudentsLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isEditing = editingClassId !== null;

  const loadClasses = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const classList = await listClasses();
      setClasses(classList);
    } catch (error) {
      setLoadError(toDisplayErrorMessage(error, "Failed to load classes."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadClasses();
  }, [loadClasses]);

  const loadStudents = useCallback(async () => {
    setAreStudentsLoading(true);
    setStudentsLoadError(null);

    try {
      const studentsList = await listStudents();
      setStudents(studentsList);
    } catch (error) {
      setStudentsLoadError(toDisplayStudentsErrorMessage(error, "Failed to load students."));
    } finally {
      setAreStudentsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStudents();
  }, [loadStudents]);

  const handleFieldChange = (field: keyof ClassFormState, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetToCreateMode = () => {
    setEditingClassId(null);
    setForm(EMPTY_FORM);
    setSelectedStudentIds([]);
  };

  const handleSelectClassForEdit = (classRoom: ClassRoom) => {
    setEditingClassId(classRoom.id);
    setForm({
      topic: classRoom.topic,
      year: String(classRoom.year),
      semester: String(classRoom.semester),
    });
    setSelectedStudentIds(classRoom.studentIds);
    setSubmitError(null);
    setSuccessMessage(`Editing \"${classRoom.topic}\".`);
  };

  const handleToggleStudentSelection = (studentId: string) => {
    setSelectedStudentIds((previous) => {
      if (previous.includes(studentId)) {
        return previous.filter((id) => id !== studentId);
      }

      return [...previous, studentId];
    });
  };

  const handleCancelEdit = () => {
    resetToCreateMode();
    setSubmitError(null);
    setSuccessMessage("Edit canceled. Back to create mode.");
  };

  const handleDeleteClass = async (classRoom: ClassRoom) => {
    setSubmitError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await deleteClass(classRoom.id);

      if (editingClassId === classRoom.id) {
        resetToCreateMode();
      }

      setSuccessMessage("Class deleted successfully.");
      await loadClasses();
    } catch (error) {
      setSubmitError(toDisplayErrorMessage(error, "Failed to delete class."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitClass = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError(null);
    setSuccessMessage(null);

    const topic = form.topic.trim();
    const year = Number(form.year);
    const semester = Number(form.semester);

    if (!topic) {
      setSubmitError("Topic is required.");
      return;
    }

    if (!Number.isInteger(year) || year < 1) {
      setSubmitError("Year must be a positive integer.");
      return;
    }

    if (!Number.isInteger(semester) || (semester !== 1 && semester !== 2)) {
      setSubmitError("Semester must be 1 or 2.");
      return;
    }

    const payload: CreateClassPayload = {
      topic,
      year,
      semester,
      studentIds: selectedStudentIds,
      assessmentsByStudent: {},
    };

    if (isEditing) {
      const classBeingEdited = classes.find((classRoom) => classRoom.id === editingClassId);

      if (!classBeingEdited || !editingClassId) {
        setSubmitError("The selected class for editing was not found.");
        return;
      }

      payload.assessmentsByStudent = classBeingEdited.assessmentsByStudent;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && editingClassId) {
        await updateClass(editingClassId, payload);
        resetToCreateMode();
        setSuccessMessage("Class updated successfully.");
      } else {
        await createClass(payload);
        setForm(EMPTY_FORM);
        setSelectedStudentIds([]);
        setSuccessMessage("Class created successfully.");
      }

      await loadClasses();
    } catch (error) {
      setSubmitError(
        toDisplayErrorMessage(error, isEditing ? "Failed to update class." : "Failed to create class.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="classes-page">
      <header className="classes-page__header page-card">
        <h2>Classes</h2>
        <p>
          Create and review registered classes. The data is loaded from the backend API and
          refreshed after successful creation.
        </p>
      </header>

      <div className="classes-grid">
        <article className={`page-card classes-card ${isEditing ? "classes-card--editing" : ""}`.trim()}>
          <div className="classes-card__header">
            <h3>{isEditing ? "Edit Class" : "Create Class"}</h3>
            <p>
              {isEditing
                ? "Update topic, year, and semester, then save changes."
                : "Fill in the class topic, year, and semester to save a new record."}
            </p>
          </div>

          <form className="classes-form" onSubmit={handleSubmitClass}>
            {isEditing && (
              <p className="classes-editing-indicator" role="status">
                Editing mode is active.
              </p>
            )}

            <label className="classes-form__field" htmlFor="class-topic">
              Topic
              <input
                id="class-topic"
                value={form.topic}
                onChange={(event) => handleFieldChange("topic", event.target.value)}
                placeholder="e.g. Algebra I"
                required
              />
            </label>

            <label className="classes-form__field" htmlFor="class-year">
              Year
              <input
                id="class-year"
                type="number"
                min={1}
                step={1}
                value={form.year}
                onChange={(event) => handleFieldChange("year", event.target.value)}
                placeholder="e.g. 2026"
                required
              />
            </label>

            <label className="classes-form__field" htmlFor="class-semester">
              Semester
              <input
                id="class-semester"
                type="number"
                min={1}
                max={2}
                step={1}
                value={form.semester}
                onChange={(event) => handleFieldChange("semester", event.target.value)}
                placeholder="1 or 2"
                required
              />
            </label>

            <fieldset className="classes-form__student-fieldset">
              <legend className="classes-form__student-legend">Enrolled students</legend>

              {studentsLoadError && (
                <p className="classes-status classes-status--error" role="alert">
                  {studentsLoadError}
                </p>
              )}

              {!studentsLoadError && areStudentsLoading && (
                <p className="classes-form__student-help" role="status">
                  Loading available students...
                </p>
              )}

              {!studentsLoadError && !areStudentsLoading && students.length === 0 && (
                <p className="classes-form__student-help" role="status">
                  No students available to enroll.
                </p>
              )}

              {!studentsLoadError && !areStudentsLoading && students.length > 0 && (
                <div className="classes-students-selector" role="group" aria-label="Select enrolled students">
                  {students.map((student) => {
                    const inputId = `class-student-${student.id}`;
                    const isSelected = selectedStudentIds.includes(student.id);

                    return (
                      <label className="classes-students-selector__item" htmlFor={inputId} key={student.id}>
                        <input
                          id={inputId}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleStudentSelection(student.id)}
                          disabled={isSubmitting}
                        />
                        <span>{student.name}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              <p className="classes-form__student-count">Selected: {selectedStudentIds.length}</p>
            </fieldset>

            <div className="classes-form__actions">
              <button type="submit" className="classes-form__submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isEditing ? "Save changes" : "Create class"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="classes-form__cancel"
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                >
                  Cancel edit
                </button>
              )}
            </div>

            {submitError && (
              <p className="classes-status classes-status--error" role="alert">
                {submitError}
              </p>
            )}

            {successMessage && (
              <p className="classes-status classes-status--success" role="status">
                {successMessage}
              </p>
            )}
          </form>
        </article>

        <article className="page-card classes-card">
          <div className="classes-card__header classes-card__header--inline">
            <div>
              <h3>Class List</h3>
              <p>Current records synced from the backend.</p>
            </div>

            <button
              type="button"
              className="classes-refresh"
              onClick={() => void loadClasses()}
              disabled={isLoading || isSubmitting}
            >
              {isLoading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {loadError && (
            <p className="classes-status classes-status--error" role="alert">
              {loadError}
            </p>
          )}

          {!loadError && isLoading && (
            <div className="classes-loading" role="status">
              <span className="classes-loading__dot" aria-hidden="true" />
              <span>Loading classes...</span>
            </div>
          )}

          {!loadError && !isLoading && classes.length === 0 && (
            <div className="classes-empty" role="status">
              <p>No classes registered yet.</p>
              <p>Use the form to create the first class.</p>
            </div>
          )}

          {!loadError && !isLoading && classes.length > 0 && (
            <ul className="classes-list">
              {classes.map((classRoom) => (
                <li
                  key={classRoom.id}
                  className={`classes-list__item ${
                    editingClassId === classRoom.id ? "classes-list__item--active" : ""
                  }`.trim()}
                >
                  <div className="classes-list__item-main">
                    <div>
                      <p className="classes-list__topic">{classRoom.topic}</p>
                      <p className="classes-list__meta">Year: {classRoom.year}</p>
                    </div>

                    <div className="classes-list__item-actions">
                      <button
                        type="button"
                        className="classes-list__select"
                        onClick={() => handleSelectClassForEdit(classRoom)}
                        disabled={isSubmitting}
                        aria-pressed={editingClassId === classRoom.id}
                      >
                        {editingClassId === classRoom.id ? "Editing" : "Edit"}
                      </button>
                      <button
                        type="button"
                        className="classes-list__delete"
                        onClick={() => void handleDeleteClass(classRoom)}
                        disabled={isSubmitting}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="classes-list__details">
                    <p className="classes-list__meta">Semester: {classRoom.semester}</p>
                    <p className="classes-list__meta">Students: {classRoom.studentIds.length}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  );
}