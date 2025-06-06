"use client";

import { useActionState } from "react";
import { confirmEmail } from "@/lib/actions/confirmEmail";
import { ValidationMessage } from "@/types/types";
import Form from "next/form";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

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
      {/* Hidden inputs: we weten dat via de pagina ‘token’/‘email’ altijd meegeleverd worden */}
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="email" value={email} />

      <div className="form__header text-center mb-6">
        <Text variant="medium-white-20">Bevestig je e-mailadres</Text>
        <Text variant="subtext-white-12">
          Klik op de knop hieronder om je account te activeren.
        </Text>
      </div>

      {liveState.messages.length > 0 && (
        <div className="form__errors mb-4">
          {liveState.messages.map((msg, idx) => (
            <Text key={idx} variant="subtext-red-12">
              {msg}
            </Text>
          ))}
        </div>
      )}

      <div className="form__footer text-center">
        <Button type="submit" disabled={pending}>
          {pending ? "Bezig met bevestigen…" : "Bevestig e-mailadres"}
        </Button>
      </div>
    </Form>
  );
}
