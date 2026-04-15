import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createStudent, listStudents, StudentsApiError } from "../config/studentsApi";
import type { Student } from "../types/domain";

interface StudentFormState {
  name: string;
  cpf: string;
  email: string;
}

const EMPTY_FORM: StudentFormState = {
  name: "",
  cpf: "",
  email: "",
};

const CPF_LENGTH = 11;

const sanitizeCpf = (value: string): string => value.replace(/\D/g, "").slice(0, CPF_LENGTH);

const toDisplayErrorMessage = (error: unknown, fallbackMessage: string): string => {
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

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<StudentFormState>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const studentsList = await listStudents();
      setStudents(studentsList);
    } catch (error) {
      setLoadError(toDisplayErrorMessage(error, "Failed to load students."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStudents();
  }, [loadStudents]);

  const handleFieldChange = (field: keyof StudentFormState, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: field === "cpf" ? sanitizeCpf(value) : value,
    }));
  };

  const handleCreateStudent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError(null);
    setSuccessMessage(null);

    const sanitizedCpf = sanitizeCpf(form.cpf);
    if (sanitizedCpf.length !== CPF_LENGTH) {
      setSubmitError("CPF must contain exactly 11 digits.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createStudent({
        name: form.name.trim(),
        cpf: sanitizedCpf,
        email: form.email.trim(),
      });

      setForm(EMPTY_FORM);
      setSuccessMessage("Student created successfully.");
      await loadStudents();
    } catch (error) {
      setSubmitError(toDisplayErrorMessage(error, "Failed to create student."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="students-page">
      <header className="students-page__header page-card">
        <h2>Students</h2>
        <p>
          Create and review registered students. Changes are persisted through the backend
          API.
        </p>
      </header>

      <div className="students-grid">
        <article className="page-card students-card">
          <div className="students-card__header">
            <h3>Create Student</h3>
            <p>Fill in all fields to add a new student.</p>
          </div>

          <form className="students-form" onSubmit={handleCreateStudent}>
            <label className="students-form__field" htmlFor="student-name">
              Name
              <input
                id="student-name"
                value={form.name}
                onChange={(event) => handleFieldChange("name", event.target.value)}
                placeholder="e.g. Ana Silva"
                required
              />
            </label>

            <label className="students-form__field" htmlFor="student-cpf">
              CPF
              <input
                id="student-cpf"
                value={form.cpf}
                onChange={(event) => handleFieldChange("cpf", event.target.value)}
                placeholder="e.g. 12345678900"
                inputMode="numeric"
                autoComplete="off"
                maxLength={CPF_LENGTH}
                required
              />
            </label>

            <label className="students-form__field" htmlFor="student-email">
              Email
              <input
                id="student-email"
                type="email"
                value={form.email}
                onChange={(event) => handleFieldChange("email", event.target.value)}
                placeholder="e.g. ana@example.com"
                required
              />
            </label>

            <button type="submit" className="students-form__submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Create student"}
            </button>

            {submitError && (
              <p className="students-status students-status--error" role="alert">
                {submitError}
              </p>
            )}

            {successMessage && (
              <p className="students-status students-status--success" role="status">
                {successMessage}
              </p>
            )}
          </form>
        </article>

        <article className="page-card students-card">
          <div className="students-card__header students-card__header--inline">
            <div>
              <h3>Student List</h3>
              <p>Current records synced from the backend.</p>
            </div>

            <button
              type="button"
              className="students-refresh"
              onClick={() => void loadStudents()}
              disabled={isLoading || isSubmitting}
            >
              {isLoading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {loadError && (
            <p className="students-status students-status--error" role="alert">
              {loadError}
            </p>
          )}

          {!loadError && isLoading && (
            <div className="students-loading" role="status">
              <span className="students-loading__dot" aria-hidden="true" />
              <span>Loading students...</span>
            </div>
          )}

          {!loadError && !isLoading && students.length === 0 && (
            <div className="students-empty" role="status">
              <p>No students registered yet.</p>
              <p>Use the form to create the first student.</p>
            </div>
          )}

          {!loadError && !isLoading && students.length > 0 && (
            <ul className="students-list">
              {students.map((student) => (
                <li key={student.id} className="students-list__item">
                  <div>
                    <p className="students-list__name">{student.name}</p>
                    <p className="students-list__meta">CPF: {student.cpf}</p>
                  </div>
                  <p className="students-list__email">{student.email}</p>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  );
}