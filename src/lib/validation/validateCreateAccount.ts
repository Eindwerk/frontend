export interface CreateAccountFields {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type ValidationErrors = Partial<
  Record<keyof CreateAccountFields, string>
>;

// Error message constants (optional, but keep them DRY):
export const ERR_NAME_REQUIRED = "Name is required";
export const ERR_USERNAME_REQUIRED = "Username is required";
export const ERR_EMAIL_REQUIRED = "Email is required";
export const ERR_INVALID_EMAIL = "Invalid email format";
export const ERR_PASSWORD_REQUIRED = "Password is required";
export const ERR_PASSWORD_LENGTH = "Password must be at least 6 characters";
export const ERR_SERVER_CONFIG = "Server configuration error";
export const ERR_REGISTRATION_FAILED = "Registration failed";

export function validateCreateAccount(
  values: CreateAccountFields
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.name.trim()) {
    errors.name = ERR_NAME_REQUIRED;
  }
  if (!values.username.trim()) {
    errors.username = ERR_USERNAME_REQUIRED;
  }
  if (!values.email.trim()) {
    errors.email = ERR_EMAIL_REQUIRED;
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = ERR_INVALID_EMAIL;
  }
  if (!values.password) {
    errors.password = ERR_PASSWORD_REQUIRED;
  } else if (values.password.length < 6) {
    errors.password = ERR_PASSWORD_LENGTH;
  }

  return errors;
}
