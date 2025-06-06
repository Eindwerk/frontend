// validateForgotPassword.ts

export interface ForgotPasswordFields {
  email: string;
}

export type ValidationErrors = Partial<
  Record<keyof ForgotPasswordFields, string>
>;

// Error message constants:
export const ERR_EMAIL_REQUIRED = "Email is required";
export const ERR_INVALID_EMAIL = "Invalid email format";
export const ERR_SERVER_CONFIG = "Server configuration error";
export const ERR_PASSWORD_RESET_FAILED = "Password reset failed";

export function validateForgotPassword(
  values: ForgotPasswordFields
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.email.trim()) {
    errors.email = ERR_EMAIL_REQUIRED;
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = ERR_INVALID_EMAIL;
  }

  return errors;
}
