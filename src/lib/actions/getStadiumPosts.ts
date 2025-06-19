"use server";

import { cookies } from "next/headers";

export async function getPostsByStadium(stadiumId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) return null;

  // Gebruik query parameter stadium_id om te filteren op posts van dat stadion
  const res = await fetch(`${baseUrl}posts?stadium_id=${stadiumId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-API-KEY": apiKey,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}
