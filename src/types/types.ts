import { ValidationErrors } from "@/lib/validation/validateCreateAccount";

export interface ValidationMessage {
  type: "error" | "success" | "";
  messages: string[];
  fieldErrors?: ValidationErrors;
}
