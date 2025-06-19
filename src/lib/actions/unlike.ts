"use server";

import { cookies } from "next/headers";

export async function unlikePost(postId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey)
    return { success: false, message: "Config ontbreekt." };

  const res = await fetch(`${baseUrl}likes/${postId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-API-KEY": apiKey,
    },
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
