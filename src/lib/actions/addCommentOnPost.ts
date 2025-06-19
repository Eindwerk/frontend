"use server";

import { cookies } from "next/headers";

export async function addCommentonPost(postId: number, comment: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) {
    return { success: false, message: "Missing token or API config" };
  }

  const res = await fetch(`${baseUrl}comments`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({
      post_id: postId,
      comment: comment.trim(),
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return { success: false, message: error?.message || "Unknown error" };
  }

  return { success: true };
}
