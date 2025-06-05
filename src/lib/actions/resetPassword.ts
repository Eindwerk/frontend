"use server";

import { redirect } from "next/navigation";

export async function resetPassword(formData: FormData) {
  const email = formData.get("email");
  const token = formData.get("token");
  const password = formData.get("password");
  const password_confirmation = formData.get("password_confirmation");

  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  const res = await fetch(`${baseUrl}reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": apiKey!,
    },
    body: JSON.stringify({
      email,
      token,
      password,
      password_confirmation,
    }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Password reset failed.");
  }

  redirect("/sign-in");
}
