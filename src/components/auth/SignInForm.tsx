"use client";

import { useSearchParams } from "next/navigation";
import Input from "@/components/ui/input";
import Link from "next/link";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { signIn } from "@/lib/actions/signIn";
import { useActionState } from "react";
import { ValidationMessage } from "@/types/types";
import Form from "next/form";
import { ValidationErrors } from "@/lib/validation/validateSignIn";
import Image from "next/image";
import Logo from "@/assets/logo.png";

export default function SignInForm() {
  const searchParams = useSearchParams();
  // 1) Lees verify_token (en eventueel email) uit de URL
  const pendingToken = searchParams.get("verify_token") ?? "";
  const pendingEmail = searchParams.get("email") ?? "";

  // STEP A: TS‐typing voor de initiële validatiestatus
  const initialState: ValidationMessage = {
    type: "",
    messages: [],
    fieldErrors: {} as ValidationErrors,
  };

  const [liveState, formAction, pending] = useActionState(signIn, initialState);

  type FieldName = keyof ValidationErrors;
  const getFieldError = (fieldName: FieldName) =>
    liveState.fieldErrors?.[fieldName];

  return (
    <Form action={formAction} className="form" noValidate>
      {/* Verberg verify_token (en email) in het formulier */}
      {pendingToken && (
        <input type="hidden" name="verify_token" value={pendingToken} />
      )}
      {pendingEmail && (
        <input type="hidden" name="email" value={pendingEmail} />
      )}

      <div className="form__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <div className="form__header">
        <Text variant="medium-white-20">Sign in to your account</Text>

        {/* Toon banner als we via de verificatielink komen */}
        {pendingToken && (
          <Text variant="subtext-green-12">
            Je hebt op de verificatielink in je mail geklikt. Na inloggen wordt
            je e-mailadres geverifieerd.
          </Text>
        )}

        <Input
          label="Email"
          type="email"
          name="email"
          required
          defaultValue={pendingEmail}
          error={getFieldError("email")}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          required
          error={getFieldError("password")}
        />

        <Text variant="subtext-white-12">
          <Link href="/forgot-password">Forgot your password?</Link>
        </Text>

        {liveState.messages.length > 0 && (
          <div className="form__errors">
            {liveState.messages.map((msg, idx) => (
              <Text key={idx} variant="subtext-red-12">
                {msg}
              </Text>
            ))}
          </div>
        )}
      </div>

      <div className="form__footer">
        <Button type="submit">{pending ? "Signing in..." : "Sign in"}</Button>
        <Button variant="orange" type="button">
          <Link href="/create-an-account">Create an account</Link>
        </Button>
      </div>
    </Form>
  );
}
