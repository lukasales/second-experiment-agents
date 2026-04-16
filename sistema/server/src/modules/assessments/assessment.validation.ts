import { AssessmentConcept } from "../../shared/types/domain";

interface UpdateAssessmentPayload {
  classId: string;
  studentId: string;
  goal: string;
  concept: AssessmentConcept;
}

interface ValidationIssue {
  field: "payload" | "classId" | "studentId" | "goal" | "concept";
  message: string;
}

type ValidationResult =
  | {
      isValid: true;
      data: UpdateAssessmentPayload;
    }
  | {
      isValid: false;
      errors: ValidationIssue[];
    };

const validConcepts: AssessmentConcept[] = ["MANA", "MPA", "MA"];

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

const parseConcept = (value: unknown): AssessmentConcept | null => {
  if (typeof value !== "string") {
    return null;
  }

  return validConcepts.includes(value as AssessmentConcept)
    ? (value as AssessmentConcept)
    : null;
};

const validateUpdateAssessmentPayload = (payload: unknown): ValidationResult => {
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
  const classId = getNormalizedString(payload.classId);
  const studentId = getNormalizedString(payload.studentId);
  const goal = getNormalizedString(payload.goal);
  const concept = parseConcept(payload.concept);

  if (!classId) {
    errors.push({
      field: "classId",
      message: "Field 'classId' is required.",
    });
  }

  if (!studentId) {
    errors.push({
      field: "studentId",
      message: "Field 'studentId' is required.",
    });
  }

  if (!goal) {
    errors.push({
      field: "goal",
      message: "Field 'goal' is required.",
    });
  }

  if (!concept) {
    errors.push({
      field: "concept",
      message: "Field 'concept' must be one of: MANA, MPA, MA.",
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
      classId: classId as string,
      studentId: studentId as string,
      goal: goal as string,
      concept: concept as AssessmentConcept,
    },
  };
};

export { validateUpdateAssessmentPayload };
export type { UpdateAssessmentPayload, ValidationIssue };
