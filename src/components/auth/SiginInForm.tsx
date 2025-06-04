"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/actions/signIn";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import Link from "next/link";

// ✅ Past bij { error: string, success?: undefined }
const initialState: { error: string | null } = {
  error: null,
};

export default function SignInForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  useEffect(() => {
    if ("success" in state && state.success) {
      router.push("/");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="form">
      <div className="form__title">
        <Text variant="medium-white-20">Sign in to your account</Text>
      </div>

      <Input label="Email" type="email" name="email" required />
      <Input label="Password" type="password" name="password" required />

      {state?.error && <Text variant="subtext-red-12">{state.error}</Text>}

      <div className="form__forgot">
        <Link href="/forgot-password">
          <Text variant="subtext-white-12">Forgot password?</Text>
        </Link>
      </div>

      <div className="signin-page__buttons">
        <Button variant="primary" type="submit" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </div>

      <div className="signin-page__buttons">
        <Button variant="orange">
          <Link href="/create-an-account">Create an account</Link>
        </Button>
      </div>
    </form>
  );
}
