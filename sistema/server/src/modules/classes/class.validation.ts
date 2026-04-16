interface CreateClassInput {
  topic: string;
  year: number;
  semester: number;
  studentIds: string[];
  assessmentsByStudent: Record<string, unknown>;
}

interface ValidationIssue {
  field:
    | "payload"
    | "topic"
    | "year"
    | "semester"
    | "studentIds"
    | "assessmentsByStudent";
  message: string;
}

type ValidationResult =
  | {
      isValid: true;
      data: CreateClassInput;
    }
  | {
      isValid: false;
      errors: ValidationIssue[];
    };

const isObjectPayload = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const getNormalizedString = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  return normalizedValue;
};

const isInteger = (value: unknown): value is number => {
  return typeof value === "number" && Number.isInteger(value);
};

const validateStudentIds = (value: unknown): string[] | null => {
  if (!Array.isArray(value)) {
    return null;
  }

  const normalizedIds = value.map(getNormalizedString);

  if (normalizedIds.some((item) => item === null)) {
    return null;
  }

  return normalizedIds as string[];
};

const validateAssessmentsByStudent = (value: unknown): Record<string, unknown> | null => {
  if (!isObjectPayload(value)) {
    return null;
  }

  return value;
};

const validateCreateClassPayload = (payload: unknown): ValidationResult => {
  if (!isObjectPayload(payload)) {
    return {
      isValid: false,
      errors: [
        {
          field: "payload",
          message: "Payload must be an object.",
        },
      ],
    };
  }

  const errors: ValidationIssue[] = [];
  const topic = getNormalizedString(payload.topic);
  const yearCandidate = payload.year;
  const semesterCandidate = payload.semester;
  const year = isInteger(yearCandidate) ? yearCandidate : null;
  const semester = isInteger(semesterCandidate) ? semesterCandidate : null;
  const studentIds = validateStudentIds(payload.studentIds);
  const assessmentsByStudent = validateAssessmentsByStudent(payload.assessmentsByStudent);

  if (!topic) {
    errors.push({
      field: "topic",
      message: "Field 'topic' is required.",
    });
  }

  if (year === null || year < 1) {
    errors.push({
      field: "year",
      message: "Field 'year' must be a positive integer.",
    });
  }

  if (semester === null || (semester !== 1 && semester !== 2)) {
    errors.push({
      field: "semester",
      message: "Field 'semester' must be 1 or 2.",
    });
  }

  if (!studentIds) {
    errors.push({
      field: "studentIds",
      message: "Field 'studentIds' must be an array of non-empty strings.",
    });
  }

  if (!assessmentsByStudent) {
    errors.push({
      field: "assessmentsByStudent",
      message: "Field 'assessmentsByStudent' must be an object.",
    });
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    data: {
      topic: topic as string,
      year: year as number,
      semester: semester as number,
      studentIds: studentIds as string[],
      assessmentsByStudent: assessmentsByStudent as Record<string, unknown>,
    },
  };
};

export { validateCreateClassPayload };
export type { CreateClassInput, ValidationIssue };
