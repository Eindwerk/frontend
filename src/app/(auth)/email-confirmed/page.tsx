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

  if (!token || !email) {
    redirect("/");
    return null;
  }

  return <EmailConfirmedForm token={token} email={email} />;
}
