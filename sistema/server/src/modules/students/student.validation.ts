interface StudentPayloadInput {
  name: string;
  cpf: string;
  email: string;
}

interface ValidationIssue {
  field: "payload" | "name" | "cpf" | "email";
  message: string;
}

type ValidationResult =
  | {
      isValid: true;
      data: StudentPayloadInput;
    }
  | {
      isValid: false;
      errors: ValidationIssue[];
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cpfPattern = /^\d{11}$/;

const isObjectPayload = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const getNormalizedField = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  return normalizedValue;
};

const validateStudentPayload = (payload: unknown): ValidationResult => {
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
  const name = getNormalizedField(payload.name);
  const cpf = getNormalizedField(payload.cpf);
  const email = getNormalizedField(payload.email);

  if (!name) {
    errors.push({
      field: "name",
      message: "Field 'name' is required.",
    });
  }

  if (!cpf) {
    errors.push({
      field: "cpf",
      message: "Field 'cpf' is required.",
    });
  } else if (!cpfPattern.test(cpf)) {
    errors.push({
      field: "cpf",
      message: "Field 'cpf' must contain exactly 11 digits.",
    });
  }

  if (!email) {
    errors.push({
      field: "email",
      message: "Field 'email' is required.",
    });
  } else if (!emailPattern.test(email)) {
    errors.push({
      field: "email",
      message: "Field 'email' must be a valid email address.",
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
      name: name as string,
      cpf: cpf as string,
      email: email as string,
    },
  };
};

const validateCreateStudentPayload = (payload: unknown): ValidationResult => {
  return validateStudentPayload(payload);
};

export { validateStudentPayload, validateCreateStudentPayload };
export type { StudentPayloadInput, ValidationIssue };
export type CreateStudentInput = StudentPayloadInput;