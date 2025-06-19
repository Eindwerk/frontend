import { redirect } from "next/navigation";
import EmailConfirmedForm from "@/components/auth/EmailConfirmedForm";

export const metadata = {
  title: "Email Confirmed",
  description: "Your email has been successfully confirmed",
};

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

  return (
    <div className="email-confirmed-page">
      <EmailConfirmedForm token={token} email={email} />
    </div>
  );
}
