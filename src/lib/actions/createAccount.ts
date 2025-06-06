"use server";

import { ValidationMessage } from "@/types/types";
import { redirect } from "next/navigation";

import {
  CreateAccountFields,
  validateCreateAccount,
  ValidationErrors,
  ERR_SERVER_CONFIG,
  ERR_REGISTRATION_FAILED,
} from "@/lib/validation/validateCreateAccount";

export async function createAccount(
  initialState: ValidationMessage,
  formData: FormData
): Promise<ValidationMessage> {
  console.log("Initial state:", initialState);
  console.log("Form Data:", Object.fromEntries(formData.entries()));

  // 1) Extract fields
  const name = formData.get("name")?.toString().trim() || "";
  const username = formData.get("username")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";

  const values: CreateAccountFields = { name, username, email, password };

  // 2) Run our validation
  const fieldErrors: ValidationErrors = validateCreateAccount(values);
  if (Object.keys(fieldErrors).length > 0) {
    // Return the fieldErrors map, but leave `messages` empty:
    return {
      type: "error",
      messages: [], // ← we do NOT list each fieldError here
      fieldErrors, // ← per‐field messages only go here
    };
  }

  // 3) Check config
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;
  if (!baseUrl || !apiKey) {
    return {
      type: "error",
      messages: [ERR_SERVER_CONFIG], // only truly “global” errors go here
      fieldErrors: {},
    };
  }

  // 4) Call external API
  const res = await fetch(`${baseUrl}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({ name, username, email, password }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    // If backend returns 422 with field‐level errors:
    if (res.status === 422 && data?.errors) {
      const apiFieldErrors: ValidationErrors = {};
      // Only put “field”‐specific messages into fieldErrors
      if (data.errors.email?.[0]) {
        apiFieldErrors.email = data.errors.email[0];
      }
      if (data.errors.username?.[0]) {
        apiFieldErrors.username = data.errors.username[0];
      }
      // …and so on for other fields, if your API returns them

      return {
        type: "error",
        messages: [], // ← do NOT duplicate them here
        fieldErrors: apiFieldErrors,
      };
    }

    // Generic failure (not tied to a single field)
    return {
      type: "error",
      messages: [data?.message || ERR_REGISTRATION_FAILED],
      fieldErrors: {},
    };
  }

  // 5) Success: redirect
  redirect("/confirm-email");

  // (This will never actually run, because redirect throws.)
  return {
    type: "success",
    messages: [],
    fieldErrors: {},
  };
}
