"use server";

import { cookies } from "next/headers";

export async function updateProfile(
  username?: string,
  profile_image?: File,
  banner_image?: File
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

  // Zorg dat baseUrl eindigt op slash
  if (!baseUrl.endsWith("/")) {
    baseUrl += "/";
  }

  const formData = new FormData();
  if (username !== undefined) formData.append("username", username);
  if (profile_image !== undefined)
    formData.append("profile_image", profile_image);
  if (banner_image !== undefined) formData.append("banner_image", banner_image);

  try {
    const res = await fetch(`${baseUrl}users/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": apiKey,
        // Let op: geen Content-Type hier bij FormData
      },
      body: formData,
      cache: "no-store",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        message: data?.message || `HTTP ${res.status}: Profielupdate mislukt.`,
      };
    }

    const responseData = await res.json();
    return {
      success: true,
      message: responseData?.message || "Profiel succesvol bijgewerkt.",
    };
  } catch (error) {
    console.error("Update profiel error:", error);
    return {
      success: false,
      message: "Netwerkfout bij profielupdate.",
    };
  }
}
