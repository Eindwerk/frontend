"use server";

import { redirect } from "next/navigation";

export async function forgotPassword(formData: FormData) {
  const email = formData.get("email");

  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  const res = await fetch(`${baseUrl}forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": apiKey!,
    },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Password reset failed.");
  }

  // ✅ Email verzonden → redirect naar bevestigingspagina
  redirect("/email-sent");
}
