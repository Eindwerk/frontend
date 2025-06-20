"use server";

import { cookies } from "next/headers";
import type { Stadium } from "@/types/stadium";
import type { Team } from "@/types/team";
import type { User } from "@/types/user";

export async function getAllSearchData(): Promise<{
  stadiums: Stadium[];
  teams: Team[];
  users: User[];
}> {
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
      return { stadiums: [], teams: [], users: [] };
    }

    if (!baseUrl.endsWith("/")) baseUrl += "/";

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "X-API-KEY": apiKey,
    };

    const [stadiumsRes, teamsRes, usersRes] = await Promise.all([
      fetch(`${baseUrl}stadiums`, { headers, cache: "no-store" }),
      fetch(`${baseUrl}teams`, { headers, cache: "no-store" }),
      fetch(`${baseUrl}users`, { headers, cache: "no-store" }),
    ]);

    if (!stadiumsRes.ok || !teamsRes.ok || !usersRes.ok) {
      console.error("One or more fetches failed", {
        stadiums: stadiumsRes.status,
        teams: teamsRes.status,
        users: usersRes.status,
      });
      return { stadiums: [], teams: [], users: [] };
    }

    const [stadiums, teams, users] = await Promise.all([
      stadiumsRes.json(),
      teamsRes.json(),
      usersRes.json(),
    ]);

    return { stadiums, teams, users };
  } catch (err) {
    console.error("Search data fetch crashed:", err);
    return { stadiums: [], teams: [], users: [] };
  }
}
