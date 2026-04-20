import { useCallback, useEffect, useMemo, useState } from "react";
import { getClassAssessments, AssessmentsApiError, updateAssessment } from "../config/assessmentsApi";
import { listClasses, ClassesApiError } from "../config/classesApi";
import { listStudents, StudentsApiError } from "../config/studentsApi";
import type { ClassRoom, AssessmentConcept, Student } from "../types/domain";

interface AssessmentMatrixCell {
  studentId: string;
  studentName: string;
  conceptsByGoal: Record<string, AssessmentConcept | null>;
}

interface SavingCell {
  studentId: string;
  goal: string;
}

const BASE_ASSESSMENT_GOALS = ["Requirements", "Tests"] as const;
const EMPTY_MESSAGE = "No assessments are available for the selected class yet.";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const isAssessmentConcept = (value: unknown): value is AssessmentConcept => {
  return value === "MANA" || value === "MPA" || value === "MA";
};

const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (error instanceof ClassesApiError || error instanceof StudentsApiError || error instanceof AssessmentsApiError) {
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

const getStudentAssessments = (assessmentsByStudent: Record<string, unknown>, studentId: string) => {
  const studentAssessments = assessmentsByStudent[studentId];

  if (!isRecord(studentAssessments)) {
    return {};
  }

  return studentAssessments;
};

const getStoredAssessmentGoals = (assessmentsByStudent: Record<string, unknown>): string[] => {
  const goals = new Set<string>();

  for (const studentAssessments of Object.values(assessmentsByStudent)) {
    if (!isRecord(studentAssessments)) {
      continue;
    }

    for (const goal of Object.keys(studentAssessments)) {
      goals.add(goal);
    }
  }

  return Array.from(goals);
};

const formatClassOption = (classRoom: ClassRoom): string => {
  return `${classRoom.topic} - ${classRoom.year}/${classRoom.semester}`;
};

export function AssessmentsPage() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [classAssessmentsByStudent, setClassAssessmentsByStudent] = useState<Record<string, unknown> | null>(null);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [areStudentsLoading, setAreStudentsLoading] = useState(true);
  const [isLoadingAssessments, setIsLoadingAssessments] = useState(false);
  const [classesError, setClassesError] = useState<string | null>(null);
  const [studentsError, setStudentsError] = useState<string | null>(null);
  const [assessmentsError, setAssessmentsError] = useState<string | null>(null);
  const [savingCell, setSavingCell] = useState<SavingCell | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const selectedClass = useMemo(
    () => classes.find((classRoom) => classRoom.id === selectedClassId) ?? null,
    [classes, selectedClassId]
  );

  const studentNameById = useMemo(() => {
    return new Map(students.map((student) => [student.id, student.name]));
  }, [students]);

  const assessmentGoals = useMemo(() => {
    if (!selectedClass || !classAssessmentsByStudent) {
      return [];
    }

    const baseGoals: string[] = [...BASE_ASSESSMENT_GOALS];
    const additionalStoredGoals = getStoredAssessmentGoals(classAssessmentsByStudent).filter(
      (goal) => !baseGoals.includes(goal)
    );

    return [...baseGoals, ...additionalStoredGoals];
  }, [classAssessmentsByStudent, selectedClass]);

  const assessmentRows = useMemo<AssessmentMatrixCell[]>(() => {
    if (!selectedClass || !classAssessmentsByStudent) {
      return [];
    }

    return selectedClass.studentIds.map((studentId) => {
      const studentAssessments = getStudentAssessments(classAssessmentsByStudent, studentId);

      return {
        studentId,
        studentName: studentNameById.get(studentId) ?? studentId,
        conceptsByGoal: assessmentGoals.reduce<Record<string, AssessmentConcept | null>>((result, goal) => {
          const concept = studentAssessments[goal];

          result[goal] = isAssessmentConcept(concept) ? concept : null;
          return result;
        }, {}),
      };
    });
  }, [assessmentGoals, classAssessmentsByStudent, selectedClass, studentNameById]);

  const hasNoClasses = !isLoadingClasses && classes.length === 0;
  const hasNoSelection = !selectedClass && !hasNoClasses;
  const hasNoStudents = selectedClass?.studentIds.length === 0;
  const hasSaveInProgress = savingCell !== null;

  const loadClasses = useCallback(async () => {
    setIsLoadingClasses(true);
    setClassesError(null);

    try {
      const classList = await listClasses();
      setClasses(classList);
    } catch (error) {
      setClassesError(getErrorMessage(error, "Failed to load classes."));
    } finally {
      setIsLoadingClasses(false);
    }
  }, []);

  const loadStudents = useCallback(async () => {
    setAreStudentsLoading(true);
    setStudentsError(null);

    try {
      const studentsList = await listStudents();
      setStudents(studentsList);
    } catch (error) {
      setStudentsError(getErrorMessage(error, "Failed to load students."));
    } finally {
      setAreStudentsLoading(false);
    }
  }, []);

  const loadSelectedClassAssessments = useCallback(async (classId: string) => {
    setIsLoadingAssessments(true);
    setAssessmentsError(null);
    setClassAssessmentsByStudent(null);

    try {
      const result = await getClassAssessments(classId);
      setClassAssessmentsByStudent(result.assessmentsByStudent);
    } catch (error) {
      setAssessmentsError(getErrorMessage(error, "Failed to load assessments for the selected class."));
    } finally {
      setIsLoadingAssessments(false);
    }
  }, []);

  const saveCellAssessment = useCallback(
    async (studentId: string, studentName: string, goal: string, concept: AssessmentConcept) => {
      if (!selectedClass) {
        return;
      }

      setSaveSuccessMessage(null);
      setAssessmentsError(null);
      setSavingCell({ studentId, goal });

      try {
        await updateAssessment({
          classId: selectedClass.id,
          studentId,
          goal,
          concept,
        });

        setClassAssessmentsByStudent((previousState) => {
          if (!previousState) {
            return previousState;
          }

          const nextState = { ...previousState };
          const currentStudentAssessments = nextState[studentId];
          const nextStudentAssessments = isRecord(currentStudentAssessments) ? { ...currentStudentAssessments } : {};

          nextStudentAssessments[goal] = concept;
          nextState[studentId] = nextStudentAssessments;

          return nextState;
        });

        setSaveSuccessMessage(`Saved ${studentName} - ${goal} as ${concept}.`);
      } catch (error) {
        setAssessmentsError(getErrorMessage(error, "Failed to save assessment for the selected cell."));
      } finally {
        setSavingCell(null);
      }
    },
    [selectedClass]
  );

  useEffect(() => {
    void loadClasses();
    void loadStudents();
  }, [loadClasses, loadStudents]);

  useEffect(() => {
    if (!selectedClassId) {
      setClassAssessmentsByStudent(null);
      setAssessmentsError(null);
      setIsLoadingAssessments(false);
      return;
    }

    void loadSelectedClassAssessments(selectedClassId);
  }, [loadSelectedClassAssessments, selectedClassId]);

  return (
    <section className="page-card assessments-page">
      <header className="assessments-page__header">
        <h2>Assessments</h2>
        <p>
          Select one class to review and update one assessment cell at a time.
        </p>
      </header>

      <div className="assessments-page__controls">
        <label className="assessments-page__field" htmlFor="assessments-class-select">
          Class
          <select
            id="assessments-class-select"
            value={selectedClassId}
            onChange={(event) => setSelectedClassId(event.target.value)}
            disabled={isLoadingClasses || classes.length === 0}
          >
            <option value="">Select a class</option>
            {classes.map((classRoom) => (
              <option key={classRoom.id} value={classRoom.id}>
                {formatClassOption(classRoom)}
              </option>
            ))}
          </select>
        </label>

        {(isLoadingClasses || areStudentsLoading || isLoadingAssessments) && (
          <p className="assessments-page__status assessments-page__status--loading" role="status">
            Loading {isLoadingClasses ? "classes" : null}
            {isLoadingClasses && areStudentsLoading ? " and " : null}
            {areStudentsLoading ? "students" : null}
            {isLoadingAssessments ? `${isLoadingClasses || areStudentsLoading ? ", " : ""}assessments` : null}
            ...
          </p>
        )}

        {classesError && (
          <p className="assessments-page__status assessments-page__status--error" role="alert">
            {classesError}
          </p>
        )}

        {studentsError && (
          <p className="assessments-page__status assessments-page__status--error" role="alert">
            {studentsError}
          </p>
        )}

        {assessmentsError && (
          <p className="assessments-page__status assessments-page__status--error" role="alert">
            {assessmentsError}
          </p>
        )}

        {saveSuccessMessage && !hasSaveInProgress && (
          <p className="assessments-page__status assessments-page__status--success" role="status">
            {saveSuccessMessage}
          </p>
        )}
      </div>

      {hasNoClasses ? (
        <div className="assessments-page__empty-state" role="status">
          <p>No classes are available yet.</p>
          <p>Create at least one class before opening the assessment matrix.</p>
        </div>
      ) : hasNoSelection ? (
        <div className="assessments-page__empty-state" role="status">
          <p>No class selected.</p>
          <p>Choose one class above to load its assessment data.</p>
        </div>
      ) : hasNoStudents ? (
        <div className="assessments-page__empty-state" role="status">
          <p>No students enrolled in the selected class.</p>
          <p>Add at least one student to this class to use the assessment matrix.</p>
        </div>
      ) : selectedClass && classAssessmentsByStudent ? (
        <div className="assessments-page__table-wrapper" aria-busy={isLoadingAssessments}>
          <div className="assessments-page__selected-class">
            <h3>{selectedClass.topic}</h3>
            <p>
              {selectedClass.year} / {selectedClass.semester}
            </p>
          </div>

          <table className="assessments-page__table">
            <thead>
              <tr>
                <th scope="col">Student</th>
                {assessmentGoals.map((goal) => (
                  <th key={goal} scope="col">
                    {goal}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assessmentRows.map((row) => (
                <tr key={row.studentId}>
                  <th scope="row">{row.studentName}</th>
                  {assessmentGoals.map((goal) => {
                    const cellKey = `${row.studentId}-${goal}`;
                    const currentConcept = row.conceptsByGoal[goal];
                    const isCellSaving =
                      savingCell !== null &&
                      savingCell.studentId === row.studentId &&
                      savingCell.goal === goal;

                    return (
                      <td key={cellKey}>
                        <div className="assessments-page__cell-editor">
                          <select
                            aria-label={`Assessment for ${row.studentName} - ${goal}`}
                            value={currentConcept ?? ""}
                            onChange={(event) => {
                              const nextConcept = event.target.value;

                              if (!isAssessmentConcept(nextConcept)) {
                                return;
                              }

                              if (nextConcept === currentConcept || hasSaveInProgress) {
                                return;
                              }

                              void saveCellAssessment(row.studentId, row.studentName, goal, nextConcept);
                            }}
                            disabled={isLoadingAssessments || hasSaveInProgress}
                          >
                            {!currentConcept && (
                              <option value="" disabled>
                                Select
                              </option>
                            )}
                            <option value="MANA">MANA</option>
                            <option value="MPA">MPA</option>
                            <option value="MA">MA</option>
                          </select>
                          {isCellSaving && (
                            <span className="assessments-page__cell-saving" role="status" aria-live="polite">
                              Saving...
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {assessmentRows.length === 0 && (
            <div className="assessments-page__empty-state" role="status">
              <p>{EMPTY_MESSAGE}</p>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}