"use server";

import type { Post } from "@/types/post";
import { cookies } from "next/headers";

export async function getPostById(postId: number): Promise<Post | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const baseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!token || !baseUrl || !apiKey) return null;

  const res = await fetch(`${baseUrl}posts/${postId}`, {
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
