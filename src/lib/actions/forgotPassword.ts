"use server";

import { ValidationMessage } from "@/types/types";
import { redirect } from "next/navigation";

import {
  ForgotPasswordFields,
  validateForgotPassword,
  ValidationErrors,
  ERR_SERVER_CONFIG,
  ERR_PASSWORD_RESET_FAILED,
} from "@/lib/validation/validateForgotPassword";

export async function forgotPassword(
  initialState: ValidationMessage,
  formData: FormData
): Promise<ValidationMessage> {
  console.log("Initial state:", initialState);
  console.log("Form Data:", Object.fromEntries(formData.entries()));

  // 1) Extract fields
  const email = formData.get("email")?.toString().trim() || "";
  const values: ForgotPasswordFields = { email };

  // 2) Run validation
  const fieldErrors: ValidationErrors = validateForgotPassword(values);
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
  const res = await fetch(`${baseUrl}forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    // If backend returns 422 with field‐level errors:
    if (res.status === 422 && data?.errors) {
      const apiFieldErrors: ValidationErrors = {};
      if (data.errors.email?.[0]) {
        apiFieldErrors.email = data.errors.email[0];
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
  redirect("/email-sent");

  // (This will never actually run, because redirect throws.)
  return {
    type: "success",
    messages: [],
    fieldErrors: {},
  };
}
