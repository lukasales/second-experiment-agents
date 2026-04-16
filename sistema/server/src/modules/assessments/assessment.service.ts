import { AssessmentConcept } from "../../shared/types/domain";
import { getClassById, updateClassAssessment } from "../classes/class.repository";
import {
  ValidationIssue,
  validateUpdateAssessmentPayload,
} from "./assessment.validation";

interface AssessmentsByStudentResponse {
  classId: string;
  assessmentsByStudent: Record<string, unknown>;
}

interface UpdatedAssessmentEntry {
  classId: string;
  studentId: string;
  goal: string;
  concept: AssessmentConcept;
}

type GetClassAssessmentsServiceResult =
  | {
      ok: true;
      data: AssessmentsByStudentResponse;
    }
  | {
      ok: false;
      kind: "not-found";
    };

type UpdateAssessmentServiceResult =
  | {
      ok: true;
      data: UpdatedAssessmentEntry;
    }
  | {
      ok: false;
      kind: "invalid-payload";
      errors: ValidationIssue[];
    }
  | {
      ok: false;
      kind: "not-found";
    }
  | {
      ok: false;
      kind: "student-not-enrolled";
    };

const getClassAssessments = async (
  classId: string
): Promise<GetClassAssessmentsServiceResult> => {
  const classRoom = await getClassById(classId);

  if (!classRoom) {
    return {
      ok: false,
      kind: "not-found",
    };
  }

  return {
    ok: true,
    data: {
      classId: classRoom.id,
      assessmentsByStudent: classRoom.assessmentsByStudent,
    },
  };
};

const updateAssessmentWithValidation = async (
  payload: unknown
): Promise<UpdateAssessmentServiceResult> => {
  const validation = validateUpdateAssessmentPayload(payload);

  if (!validation.isValid) {
    return {
      ok: false,
      kind: "invalid-payload",
      errors: validation.errors,
    };
  }

  const classRoom = await getClassById(validation.data.classId);

  if (!classRoom) {
    return {
      ok: false,
      kind: "not-found",
    };
  }

  const isStudentEnrolled = classRoom.studentIds.includes(validation.data.studentId);

  if (!isStudentEnrolled) {
    return {
      ok: false,
      kind: "student-not-enrolled",
    };
  }

  const updatedClass = await updateClassAssessment(validation.data);

  if (!updatedClass) {
    return {
      ok: false,
      kind: "not-found",
    };
  }

  return {
    ok: true,
    data: {
      classId: validation.data.classId,
      studentId: validation.data.studentId,
      goal: validation.data.goal,
      concept: validation.data.concept,
    },
  };
};

export { getClassAssessments, updateAssessmentWithValidation };
