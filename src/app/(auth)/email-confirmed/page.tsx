// app/(auth)/email-confirmed/page.tsx
import { redirect } from "next/navigation";
import EmailConfirmedForm from "@/components/auth/EmailConfirmedForm";

export default async function EmailConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ verify_token?: string; email?: string }>;
}) {
  const params = await searchParams;
  const token = params.verify_token;
  const email = params.email;

  // Als er géén verify_token of email in de URL staan → redirect naar home
  if (!token || !email) {
    redirect("/");
    return null;
  }

  // Anders toon je het client-component met formulier
  return <EmailConfirmedForm token={token} email={email} />;
}
