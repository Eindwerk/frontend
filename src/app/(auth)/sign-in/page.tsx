import SignInForm from "@/components/auth/SignInForm";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense>
      <div className="sign-in-page">
        <SignInForm />
      </div>
    </Suspense>
  );
}
