"use server";

import { redirect } from "next/navigation";

export async function createAccount(formData: FormData) {
  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  const res = await fetch(`${baseUrl}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-KEY": apiKey!,
    },
    body: JSON.stringify({ name, username, email, password }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    // Hier mag je eventueel een `throw` gebruiken of later `useFormState` toepassen
    throw new Error(data?.message || "Account creation failed.");
  }

  // ✅ Email verification verzonden → redirect naar confirm-page
  redirect("/confirm-email");
}
