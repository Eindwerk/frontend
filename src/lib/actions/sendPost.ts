"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache"; // ✅ voeg dit toe

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
    return { success: false, message: "Missing server configuration." };
  }

  if (!baseUrl.endsWith("/")) baseUrl += "/";

  const maxFileSize = 8 * 1024 * 1024;
  if (image.size > maxFileSize) {
    return {
      success: false,
      message: "File is too large. Maximum allowed size is 8MB.",
    };
  }

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

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        message: data?.message || `HTTP ${res.status}: Post failed.`,
      };
    }

    const responseData = await res.json();

    revalidatePath("/");

    return {
      success: true,
      message: responseData?.message || "Post created successfully.",
    };
  } catch (error) {
    console.error("Create post error:", error);
    return {
      success: false,
      message: "Network error while creating post.",
    };
  }
}
