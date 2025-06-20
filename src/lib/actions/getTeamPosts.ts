"use server";

import { cookies } from "next/headers";

export async function getPostsByTeam(teamId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) return null;

  if (!baseUrl.endsWith("/")) baseUrl += "/";

  const res = await fetch(`${baseUrl}posts?team_id=${teamId}`, {
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
