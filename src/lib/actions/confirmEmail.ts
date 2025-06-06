"use server";

import { ValidationMessage } from "@/types/types";
import { redirect } from "next/navigation";
import { verifyEmail } from "./verifyEmail";

export async function confirmEmail(
  initialState: ValidationMessage,
  formData: FormData
): Promise<ValidationMessage> {
  // 1) Haal token & email uit hidden inputs
  const token = formData.get("token")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";

  // 2) Controleren of ze beide bestaan
  if (!token || !email) {
    return {
      type: "error",
      messages: ["Ontbrekende token of e-mailadres."],
      fieldErrors: {},
    };
  }

  // 3) Roep je helper aan (die naar ‘POST /email/verify’ stuurt)
  const { success, message } = await verifyEmail(token, email);

  // 4) Als verificatie faalt, geef de foutmelding terug
  if (!success) {
    return {
      type: "error",
      messages: [message || "Verificatie is mislukt."],
      fieldErrors: {},
    };
  }

  // 5) Bij succes redirect naar login, e-mail in query meegeven
  redirect(`/sign-in?email=${encodeURIComponent(email)}`);

  // (wordt niet bereikt omdat redirect() gooit)
  return {
    type: "success",
    messages: [],
    fieldErrors: {},
  };
}
