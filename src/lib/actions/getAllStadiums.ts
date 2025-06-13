"use server";

import { cookies } from "next/headers";
import type { Stadium } from "@/types/stadium";

export async function getAllStadiums(): Promise<Stadium[]> {
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

    const res = await fetch(`${baseUrl}stadiums`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-API-KEY": apiKey,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Stadiums fetch failed:", res.status, text);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error("Stadiums fetch crashed:", err);
    return [];
  }
}
