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
  // 2) Haal verify_token op (indien aanwezig)
  const verifyToken = formData.get("verify_token")?.toString() || "";

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

  // 6) Bij succesvolle login: haal token
  const apiToken: string = data.token;

  // 7) Als er een verifyToken is, roep dan het nieuwe verify‐endpoint aan
  if (verifyToken) {
    const verifyRes = await fetch(`${baseUrl}email/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-KEY": apiKey,
        // Bearer-sanctum token (Sanctum herkent Bearer‐token ook)
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ verify_token: verifyToken }),
      cache: "no-store",
    });

    // Optioneel: lees foutbericht als de token ongeldig is
    if (!verifyRes.ok) {
      const errJson = await verifyRes.json().catch(() => null);
      console.warn("Verify‐fout:", errJson?.message || "Unknown error");
      // Je kunt hier eventueel een ValidationMessage teruggeven:
      // return { type: "error", messages: [errJson?.message], fieldErrors: {} };
      // Maar meestal willen we gewoon doorredirecten naar "/"
    }
  }

  // 8) Sla het token als HTTP‐only cookie op
  const cookieStore = await cookies();
  cookieStore.set("token", apiToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // 9) Redirect naar home (of dashboard)
  redirect("/");

  // Dit wordt nooit bereikt, omdat redirect() gooit
  return {
    type: "success",
    messages: [],
    fieldErrors: {},
  };
}
