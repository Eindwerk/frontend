import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const baseUrl = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;

    const res = await fetch(`${baseUrl}teams`, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey!,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch teams");
    }

    const teams = await res.json();
    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
