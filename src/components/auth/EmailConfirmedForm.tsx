"use client";

import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Logo from "@/assets/logo.png";
import { useActionState } from "react";
import { confirmEmail } from "@/lib/actions/confirmEmail";
import type { ValidationMessage } from "@/types/types";

interface EmailConfirmedFormProps {
  token: string;
  email: string;
}

export default function EmailConfirmedForm({
  token,
  email,
}: EmailConfirmedFormProps) {
  const initialState: ValidationMessage = {
    type: "",
    messages: [],
    fieldErrors: {},
  };

  const [liveState, formAction, pending] = useActionState(
    confirmEmail,
    initialState
  );

  return (
    <Form action={formAction} className="form" noValidate>
      <div className="form__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <div className="form__email-confirmed">
        <Text variant="medium-white-20">Confirm Email</Text>
        <Text variant="subtext-white-12">
          Click the button below to activate your account.
        </Text>

        {/* Hidden inputs */}
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />
      </div>

      {liveState.messages.length > 0 && (
        <div className="form__errors">
          {liveState.messages.map((msg, idx) => (
            <Text key={idx} variant="subtext-red-12">
              {msg}
            </Text>
          ))}
        </div>
      )}

      <div className="form__footer">
        <Button type="submit" disabled={pending}>
          {pending ? "Confirming…" : "Confirm Email"}
        </Button>
        <Button variant="orange" type="button">
          <Link href="/sign-in">Back</Link>
        </Button>
      </div>
    </Form>
  );
}
