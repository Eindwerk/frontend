// app/reset-password/page.tsx
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string; email?: string };
}) {
  // Als er GEEN token OF GEEN email in de query zit, redirect naar /sign-in
  if (!searchParams.token || !searchParams.email) {
    return redirect("/sign-in");
  }

  // Bestaat er wél een token én email? Laat dan de form‐component renderen:
  return (
    <ResetPasswordForm token={searchParams.token} email={searchParams.email} />
  );
}
