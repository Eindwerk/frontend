"use server";

import { cookies } from "next/headers";

export async function checkFollow(pageId: number): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) return false;

  const res = await fetch(`${baseUrl}following`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-API-KEY": apiKey,
    },
    cache: "no-store",
  });

  if (!res.ok) return false;

  const data = await res.json();

  // Check of een van de volgrelaties overeenkomt met de pageId
  const isFollowing = data.follows?.some(
    (follow: { followable_id: number }) => follow.followable_id === pageId
  );

  return isFollowing ?? false;
}
