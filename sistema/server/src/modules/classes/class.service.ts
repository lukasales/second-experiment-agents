import { ClassRoom } from "../../shared/types/domain";
import { createClass, deleteClassById, updateClassById } from "./class.repository";
import {
  ValidationIssue,
  validateCreateClassPayload,
} from "./class.validation";

type CreateClassServiceResult =
  | {
      ok: true;
      classRoom: ClassRoom;
    }
  | {
      ok: false;
      kind: "invalid-payload";
      errors: ValidationIssue[];
    };

type UpdateClassServiceResult =
  | {
      ok: true;
      classRoom: ClassRoom;
    }
  | {
      ok: false;
      kind: "invalid-payload";
      errors: ValidationIssue[];
    }
  | {
      ok: false;
      kind: "not-found";
    };

type DeleteClassServiceResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      kind: "not-found";
    };

const createClassWithValidation = async (
  payload: unknown
): Promise<CreateClassServiceResult> => {
  const validation = validateCreateClassPayload(payload);

  if (!validation.isValid) {
    return {
      ok: false,
      kind: "invalid-payload",
      errors: validation.errors,
    };
  }

  const classRoom = await createClass(validation.data);

  return {
    ok: true,
    classRoom,
  };
};

const updateClassWithValidation = async (
  id: string,
  payload: unknown
): Promise<UpdateClassServiceResult> => {
  const validation = validateCreateClassPayload(payload);

  if (!validation.isValid) {
    return {
      ok: false,
      kind: "invalid-payload",
      errors: validation.errors,
    };
  }

  const classRoom = await updateClassById(id, validation.data);

  if (!classRoom) {
    return {
      ok: false,
      kind: "not-found",
    };
  }

  return {
    ok: true,
    classRoom,
  };
};

const deleteClassWithValidation = async (
  id: string
): Promise<DeleteClassServiceResult> => {
  const wasDeleted = await deleteClassById(id);

  if (!wasDeleted) {
    return {
      ok: false,
      kind: "not-found",
    };
  }

  return {
    ok: true,
  };
};

export {
  createClassWithValidation,
  deleteClassWithValidation,
  updateClassWithValidation,
};
