"use server";

import { ValidationMessage } from "@/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  SignInFields,
  validateSignIn,
  ValidationErrors,
  ERR_SERVER_CONFIG,
  ERR_LOGIN_FAILED,
} from "@/lib/validation/validateSignIn";

export async function signIn(
  initialState: ValidationMessage,
  formData: FormData
): Promise<ValidationMessage> {
  // 1) Extract fields
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";

  const values: SignInFields = { email, password };

  // 2) Run validation
  const fieldErrors: ValidationErrors = validateSignIn(values);
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
      messages: [ERR_SERVER_CONFIG],
      fieldErrors: {},
    };
  }

  // 4) Call external API
  const res = await fetch(`${baseUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({ email, password }),
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
      if (data.errors.password?.[0]) {
        apiFieldErrors.password = data.errors.password[0];
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
      messages: [data?.message || ERR_LOGIN_FAILED],
      fieldErrors: {},
    };
  }

  // 5) On success: set cookie and redirect
  const cookieStore = await cookies();
  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect("/");

  // (This will never actually run, because redirect throws.)
  return {
    type: "success",
    messages: [],
    fieldErrors: {},
  };
}
