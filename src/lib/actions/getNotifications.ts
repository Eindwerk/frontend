"use server";

import type { Notification } from "@/types/notification";
import { cookies } from "next/headers";

export async function getNotifications(): Promise<Notification[] | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) return null;

  const res = await fetch(`${baseUrl}notifications`, {
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
