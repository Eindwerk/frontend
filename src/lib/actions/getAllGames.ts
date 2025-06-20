"use server";

import { cookies } from "next/headers";
import type { Game } from "@/types/game";

export async function getAllGames(): Promise<Game[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    let baseUrl = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;

    if (!token || !baseUrl || !apiKey) {
      console.error("Missing token, baseUrl, or apiKey", {
        token,
        baseUrl,
        apiKey,
      });
      return [];
    }

    if (!baseUrl.endsWith("/")) baseUrl += "/";

    const res = await fetch(`${baseUrl}games`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-API-KEY": apiKey,
      },
      cache: "force-cache",
      next: {
        revalidate: 604800, // ⏱️ 7 dagen
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Games fetch failed:", res.status, text);
      return [];
    }

    const data: Game[] = await res.json();
    return data;
  } catch (err) {
    console.error("Games fetch crashed:", err);
    return [];
  }
}
