"use server";

import { cookies } from "next/headers";

export async function unFollowEntity(
  followable_type: string,
  followable_id: number
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey)
    return { success: false, message: "Config ontbreekt." };

  const res = await fetch(`${baseUrl}unfollow`, {
    method: "DELETE",
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

  if (res.status === 204) {
    return { success: true };
  }

  if (!res.ok) {
    return { success: false, message: `Status ${res.status}` };
  }

  try {
    const data = await res.json();
    return { success: true, ...data };
  } catch {
    return { success: false, message: "Kon geen JSON parsen." };
  }
}
