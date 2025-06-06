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

  // 3) Run validation
  const fieldErrors: ValidationErrors = validateSignIn(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      type: "error",
      messages: [],
      fieldErrors,
    };
  }

  // 4) Check config
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;
  if (!baseUrl || !apiKey) {
    return {
      type: "error",
      messages: [ERR_SERVER_CONFIG],
      fieldErrors: {},
    };
  }

  // 5) Call external API: login
  const loginRes = await fetch(`${baseUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  let data;
  try {
    data = await loginRes.json();
  } catch {
    data = null;
  }

  if (!loginRes.ok) {
    if (loginRes.status === 422 && data?.errors) {
      const apiFieldErrors: ValidationErrors = {};
      if (data.errors.email?.[0]) {
        apiFieldErrors.email = data.errors.email[0];
      }
      if (data.errors.password?.[0]) {
        apiFieldErrors.password = data.errors.password[0];
      }
      return {
        type: "error",
        messages: [],
        fieldErrors: apiFieldErrors,
      };
    }

    return {
      type: "error",
      messages: [data?.message || ERR_LOGIN_FAILED],
      fieldErrors: {},
    };
  }

  // 6) Bij succesvolle login: haal token én verified‐status
  const apiToken: string = data.token;
  const isVerified: boolean = data.verified;

  // 7) Als verified false is, geef direct een foutmelding terug (en log niet in)
  if (!isVerified) {
    return {
      type: "error",
      messages: [
        "Je e-mailadres is nog niet geverifieerd. Controleer je mailbox!",
      ],
      fieldErrors: {},
    };
  }

  // 9) Sla het token als HTTP‐only cookie op
  const cookieStore = await cookies();
  cookieStore.set("token", apiToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // 10) Redirect naar home (of dashboard)
  redirect("/");
}
