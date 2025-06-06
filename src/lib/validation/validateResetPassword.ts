export interface ResetPasswordFields {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export type ValidationErrors = Partial<
  Record<keyof ResetPasswordFields, string>
>;

// Error message constants:
export const ERR_EMAIL_REQUIRED = "Email is required";
export const ERR_INVALID_EMAIL = "Invalid email format";
export const ERR_TOKEN_REQUIRED = "Token is required";
export const ERR_PASSWORD_REQUIRED = "Password is required";
export const ERR_PASSWORD_LENGTH = "Password must be at least 6 characters";
export const ERR_PASSWORD_MISMATCH = "Passwords do not match";
export const ERR_SERVER_CONFIG = "Server configuration error";
export const ERR_PASSWORD_RESET_FAILED = "Password reset failed";

export function validateResetPassword(
  values: ResetPasswordFields
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.email.trim()) {
    errors.email = ERR_EMAIL_REQUIRED;
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = ERR_INVALID_EMAIL;
  }

  if (!values.token.trim()) {
    errors.token = ERR_TOKEN_REQUIRED;
  }

  if (!values.password) {
    errors.password = ERR_PASSWORD_REQUIRED;
  } else if (values.password.length < 6) {
    errors.password = ERR_PASSWORD_LENGTH;
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = ERR_PASSWORD_REQUIRED;
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = ERR_PASSWORD_MISMATCH;
  }

  return errors;
}
