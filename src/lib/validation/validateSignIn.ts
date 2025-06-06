export interface SignInFields {
  email: string;
  password: string;
}

export type ValidationErrors = Partial<Record<keyof SignInFields, string>>;

// Error message constants:
export const ERR_EMAIL_REQUIRED = "Email is required";
export const ERR_INVALID_EMAIL = "Invalid email format";
export const ERR_PASSWORD_REQUIRED = "Password is required";
export const ERR_SERVER_CONFIG = "Server configuration error";
export const ERR_LOGIN_FAILED = "Login failed";

export function validateSignIn(values: SignInFields): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.email.trim()) {
    errors.email = ERR_EMAIL_REQUIRED;
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = ERR_INVALID_EMAIL;
  }

  if (!values.password) {
    errors.password = ERR_PASSWORD_REQUIRED;
  }

  return errors;
}
