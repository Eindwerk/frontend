"use server";

import { cookies } from "next/headers";

export async function signIn(_prevState: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!baseUrl || !apiKey) {
    return { error: "Server misconfigured: missing API credentials." };
  }

  try {
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
      return { error: data?.message || "Something went wrong" };
    }

    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dagen
    });

    return { success: true };
  } catch {
    return { error: "Network error. Please try again." };
  }
}
