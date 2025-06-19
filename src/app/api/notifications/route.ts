import { NextResponse } from "next/server";
import { getNotifications } from "@/lib/actions/getNotifications";
import { getUserById } from "@/lib/actions/getUserById";

export async function GET() {
  const notifications = await getNotifications();
  if (!notifications) return NextResponse.json([]);

  const enriched = await Promise.all(
    notifications.map(async (notif) => {
      let username = "Onbekend";
      if (notif.sender_id) {
        const user = await getUserById(notif.sender_id);
        if (user && user.username) username = user.username;
      }

      return {
        ...notif,
        username, // ← extra veld
      };
    })
  );

  return NextResponse.json(enriched);
}
