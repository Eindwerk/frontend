"use server";

import { ValidationMessage } from "@/types/types";
import { redirect } from "next/navigation";

import {
  ResetPasswordFields,
  validateResetPassword,
  ValidationErrors,
  ERR_SERVER_CONFIG,
  ERR_PASSWORD_RESET_FAILED,
} from "@/lib/validation/validateResetPassword";

export async function resetPassword(
  initialState: ValidationMessage,
  formData: FormData
): Promise<ValidationMessage> {
  // 1) Extract fields
  const email = formData.get("email")?.toString().trim() || "";
  const token = formData.get("token")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";
  const password_confirmation =
    formData.get("password_confirmation")?.toString() || "";

  const values: ResetPasswordFields = {
    email,
    token,
    password,
    password_confirmation,
  };

  // 2) Run validation
  const fieldErrors: ValidationErrors = validateResetPassword(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      type: "error",
      messages: [], // per‐field errors only go in fieldErrors
      fieldErrors,
    };
  }

  // 3) Check config
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;
  if (!baseUrl || !apiKey) {
    return {
      type: "error",
      messages: [ERR_SERVER_CONFIG], // truly “global” errors go here
      fieldErrors: {},
    };
  }

  // 4) Call external API
  const res = await fetch(`${baseUrl}reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({ email, token, password, password_confirmation }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    // If backend returns 422 with field‐level errors:
    if (res.status === 422 && data?.errors) {
      const apiFieldErrors: ValidationErrors = {};
      if (data.errors.password?.[0]) {
        apiFieldErrors.password = data.errors.password[0];
      }
      if (data.errors.password_confirmation?.[0]) {
        apiFieldErrors.password_confirmation =
          data.errors.password_confirmation[0];
      }
      return {
        type: "error",
        messages: [], // do NOT duplicate them here
        fieldErrors: apiFieldErrors,
      };
    }

    // Generic failure (not tied to a single field)
    return {
      type: "error",
      messages: [data?.message || ERR_PASSWORD_RESET_FAILED],
      fieldErrors: {},
    };
  }

  // 5) Success: redirect
  redirect("/sign-in");
}
