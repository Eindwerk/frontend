"use client";

import Input from "@/components/ui/input";
import Link from "next/link";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { forgotPassword } from "@/lib/actions/forgotPassword";
import { useActionState } from "react";
import { ValidationMessage } from "@/types/types";
import Form from "next/form";
import { ValidationErrors } from "@/lib/validation/validateForgotPassword";
import Image from "next/image";
import Logo from "@/assets/logo.png";

export default function ForgotPasswordForm() {
  // STEP A: tell TS that fieldErrors is a ValidationErrors
  const initialState: ValidationMessage = {
    type: "",
    messages: [],
    fieldErrors: {} as ValidationErrors,
  };

  // `liveState.fieldErrors` will be a ValidationErrors whenever the action returns it
  const [liveState, formAction, pending] = useActionState(
    forgotPassword,
    initialState
  );

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
        <Text variant="medium-white-20">Fill in your email</Text>

        <Input
          label="Email"
          type="email"
          name="email"
          required
          error={getFieldError("email")}
        />

        {/* ONLY “global” errors go here. Because we return an empty messages[]
            when there are per‐field errors, there will be no duplication. */}
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
        <Button type="submit">{pending ? "Sending..." : "Send email"}</Button>
        <Button variant="orange" type="button">
          <Link href="/sign-in">Back</Link>
        </Button>
      </div>
    </Form>
  );
}
