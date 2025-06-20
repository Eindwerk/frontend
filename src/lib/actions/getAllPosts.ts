"use server";

import { cookies } from "next/headers";
import type { Post } from "@/types/post";

export async function getAllPost(): Promise<Post[]> {
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

    const res = await fetch(`${baseUrl}posts`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-API-KEY": apiKey,
      },
      cache: "force-cache",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Posts fetch failed:", res.status, text);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error("Posts fetch crashed:", err);
    return [];
  }
}
