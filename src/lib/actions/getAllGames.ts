"use server";

import { cookies } from "next/headers";
import type { Game } from "@/types/game";

export async function getAllGames(): Promise<Game[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;

    if (!token || !baseUrl || !apiKey) {
      console.error("Missing token, baseUrl, or apiKey", {
        token,
        baseUrl,
        apiKey,
      });
      return [];
    }

    const res = await fetch(`${baseUrl}games`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-API-KEY": apiKey,
      },
      cache: "no-store",
    });

    const data: Game[] = await res.json();

    if (!res.ok) {
      const text = await res.text();
      console.error("Games fetch failed:", res.status, text);
      return [];
    }

    return data;
  } catch (err) {
    console.error("Games fetch crashed:", err);
    return [];
  }
}
