"use client";

import Input from "@/components/ui/input";
import Link from "next/link";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { resetPassword } from "@/lib/actions/resetPassword";
import { useActionState } from "react";
import { ValidationMessage } from "@/types/types";
import Form from "next/form";
import type {
  ValidationErrors as ResetValidationErrors,
  ResetPasswordFields,
} from "@/lib/validation/validateResetPassword";
import Image from "next/image";
import Logo from "@/assets/logo.png";

interface ResetPasswordFormProps {
  token: string;
  email: string;
}

export default function ResetPasswordForm({
  token,
  email,
}: ResetPasswordFormProps) {
  // STEP A: vertel TS dat fieldErrors de juiste shape heeft
  const initialState: ValidationMessage = {
    type: "",
    messages: [],
    fieldErrors: {} as ResetValidationErrors,
  };

  const [liveState, formAction, pending] = useActionState(
    resetPassword,
    initialState
  );

  // Hier gebruiken we expliciet de keys van ResetPasswordFields
  type FieldName = keyof ResetPasswordFields;
  const getFieldError = (fieldName: FieldName) => {
    const errs = liveState.fieldErrors as ResetValidationErrors;
    return errs[fieldName];
  };

  return (
    <Form action={formAction} className="form" noValidate>
      <div className="form__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>
      <div className="form__header">
        <Text variant="medium-white-20">Choose a new password</Text>

        {/* We weten hier zeker dat token & email bestaan, dus gewoon hidden inputs aanmaken */}
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />

        <Input
          label="New password"
          type="password"
          name="password"
          required
          error={getFieldError("password")}
        />

        <Input
          label="Confirm password"
          type="password"
          name="password_confirmation"
          required
          error={getFieldError("password_confirmation")}
        />

        {/* Alleen “global” foutmeldingen: per‐field errors worden al getoond bij de betreffende Input */}
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
        <Button type="submit">
          {pending ? "Resetting..." : "Reset password"}
        </Button>
        <Button variant="orange" type="button">
          <Link href="/sign-in">Back</Link>
        </Button>
      </div>
    </Form>
  );
}
