"use client";

import { useFormStatus } from "react-dom";
import Button from "@/components/ui/Button";

interface SubmitButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "orange";
  type?: "submit" | "button" | "reset";
}

const SubmitButton = ({
  children,
  variant = "primary",
  type = "submit",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant} type={type} disabled={pending}>
      {pending ? "Loading..." : children}
    </Button>
  );
};

export default SubmitButton;
