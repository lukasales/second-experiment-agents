import { ClassRoom } from "../../shared/types/domain";
import { createClass } from "./class.repository";
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

export { createClassWithValidation };
