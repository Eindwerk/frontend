import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const params = await searchParams;

  if (!params.token || !params.email) {
    return redirect("/sign-in");
  }

  return <ResetPasswordForm token={params.token} email={params.email} />;
}
