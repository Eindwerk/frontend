import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = (await searchParams) as { token?: string; email?: string };

  if (!params.token || !params.email) {
    return redirect("/sign-in");
  }

  return <ResetPasswordForm token={params.token} email={params.email} />;
}
