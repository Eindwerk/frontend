"use server";

import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function getUserById(userId: number): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) return null;

  if (!baseUrl.endsWith("/")) baseUrl += "/";

  const res = await fetch(`${baseUrl}users/${userId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-API-KEY": apiKey,
    },
    cache: "force-cache",
    next: {
      revalidate: 60, // ⏱️ 1 minuut
    },
  });

  if (!res.ok) return null;

  return res.json();
}
