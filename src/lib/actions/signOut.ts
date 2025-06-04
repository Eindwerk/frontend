"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    path: "/",
    maxAge: 0,
  });

  redirect("/welcome");
}
