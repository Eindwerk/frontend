"use server";

import { cookies } from "next/headers";

export async function SendNewPost(
  game_id: number,
  stadium_id: number,
  image: File
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

  const formData = new FormData();

  if (game_id !== undefined) formData.append("game_id", String(game_id));
  if (stadium_id !== undefined)
    formData.append("stadium_id", String(stadium_id));
  if (image !== undefined) formData.append("image", image);

  try {
    const res = await fetch(`${baseUrl}posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": apiKey,
      },
      body: formData,
      cache: "no-store",
    });

    console.log("Response status:", res);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Post creation failed:", data);
      return {
        success: false,
        message: data?.message || `HTTP ${res.status}: Post mislukt.`,
      };
    }

    const responseData = await res.json();
    return {
      success: true,
      message: responseData?.message || "Post succesvol aangemaakt.",
    };
  } catch (error) {
    console.error("Create post error:", error);
    return {
      success: false,
      message: "Netwerkfout bij het aanmaken van de post.",
    };
  }
}
