"use server";

import { cookies } from "next/headers";

export async function followEntity(
  followable_type: string,
  followable_id: number
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) return null;

  const res = await fetch(`${baseUrl}follow`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      followable_type,
      followable_id,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text().catch(() => "");
    return { success: false, message: error || "Volgen mislukt." };
  }

  const data = await res.json().catch(() => ({}));
  return { success: true, ...data };
}
