import { redirect } from "next/navigation";
import EmailConfirmed from "@/components/auth/EmailConfirmed.tsx";
import { verifyEmail } from "@/lib/actions/verifyEmail";

export default async function EmailConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const { token, email } = await searchParams;

  if (!token || !email) {
    redirect("/");
    return null;
  }

  const { success, message } = await verifyEmail(token, email);

  return <EmailConfirmed success={success} email={email} message={message} />;
}
