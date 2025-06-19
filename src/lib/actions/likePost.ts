"use server";

import { cookies } from "next/headers";

export async function likePost(postId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) return null;

  const res = await fetch(`${baseUrl}likes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post_id: postId }),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text().catch(() => "");
    return { success: false, message: error || "Like toevoegen mislukt." };
  }

  const data = await res.json().catch(() => ({}));
  return { success: true, ...data };
}
