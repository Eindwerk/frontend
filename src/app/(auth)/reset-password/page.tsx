import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata = {
  title: "Reset Password",
  description: "Reset your password to regain access to your account",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const params = await searchParams;

  if (!params.token || !params.email) {
    return redirect("/sign-in");
  }

  return (
    <div className="reset-password-page">
      <ResetPasswordForm token={params.token} email={params.email} />
    </div>
  );
}
