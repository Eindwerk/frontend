"use client";

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
  // STEP A: tell TS that fieldErrors is a ValidationErrors
  const initialState: ValidationMessage = {
    type: "",
    messages: [],
    fieldErrors: {} as ValidationErrors,
  };

  // `liveState.fieldErrors` will be a ValidationErrors whenever the action returns it
  const [liveState, formAction, pending] = useActionState(signIn, initialState);

  // Now we explicitly say that fieldName is one of the keys in ValidationErrors
  type FieldName = keyof ValidationErrors;
  const getFieldError = (fieldName: FieldName) => {
    return liveState.fieldErrors?.[fieldName];
  };

  return (
    <Form action={formAction} className="form" noValidate>
      <div className="form__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>
      <div className="form__header">
        <Text variant="medium-white-20">Sign in to your account</Text>

        <Input
          label="Email"
          type="email"
          name="email"
          required
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

        {/* ONLY “global” errors go here. Because we returned an empty messages[]
            when there were per-field errors, there will be no duplication. */}
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
