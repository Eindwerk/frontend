"use server";

import { cookies } from "next/headers";

export async function toggleLike(
  post_id: number,
  alreadyLiked: boolean
): Promise<{
  success: boolean;
  message?: string;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) {
    return { success: false, message: "Serverconfiguratie ontbreekt." };
  }

  if (!baseUrl.endsWith("/")) baseUrl += "/";

  const url = alreadyLiked
    ? `${baseUrl}likes/${post_id}` // DELETE /likes/:post_id
    : `${baseUrl}likes`; // POST /likes

  const method = alreadyLiked ? "DELETE" : "POST";

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "X-API-KEY": apiKey,
  };

  if (!alreadyLiked) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: alreadyLiked ? undefined : JSON.stringify({ post_id }),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message:
          data?.message ||
          `HTTP ${res.status}: ${alreadyLiked ? "Unlike" : "Like"} mislukt.`,
      };
    }

    return {
      success: true,
      message:
        data?.message ||
        (alreadyLiked ? "Like verwijderd." : "Like toegevoegd."),
    };
  } catch (error) {
    console.error("Toggle like error:", error);
    return {
      success: false,
      message: "Netwerkfout bij het liken/unliken.",
    };
  }
}
