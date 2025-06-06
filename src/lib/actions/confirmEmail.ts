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

  // 2) Simpele validatie: beide velden moeten aanwezig zijn
  if (!token || !email) {
    return {
      type: "error",
      messages: ["Ontbrekende token of e-mailadres."],
      fieldErrors: {},
    };
  }

  // 3) Roep je helper aan om te verifiëren bij de externe API
  const { success, message } = await verifyEmail(token, email);

  // 4) Als de API‐call faalt, toon dan de foutmelding
  if (!success) {
    return {
      type: "error",
      messages: [message || "Verificatie is mislukt."],
      fieldErrors: {},
    };
  }

  // 5) Bij succes redirect je naar de loginpagina (met eventueel voorgevulde e-mail)
  redirect(`/sign-in?email=${encodeURIComponent(email)}`);

  // (de redirect gooit, dus onderstaande code wordt nooit écht gerund)
  return {
    type: "success",
    messages: [],
    fieldErrors: {},
  };
}
