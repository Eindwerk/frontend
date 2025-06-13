import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const baseUrl = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;

    const res = await fetch(`${baseUrl}stadiums`, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey!,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch stadiums");
    }

    const stadiums = await res.json();
    return NextResponse.json(stadiums);
  } catch (error) {
    console.error("Error fetching stadiums:", error);
    return NextResponse.json(
      { error: "Failed to fetch stadiums" },
      { status: 500 }
    );
  }
}
