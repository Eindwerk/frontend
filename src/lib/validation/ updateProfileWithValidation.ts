import {
  validateUpdateProfile,
  UpdateProfileFields,
  UpdateProfileErrors,
} from "./validateUpdateProfile";
import { updateProfile } from "../actions/updateProfile";

export async function updateProfileWithValidation(
  fields: UpdateProfileFields
): Promise<{
  success: boolean;
  errors: UpdateProfileErrors;
  message?: string;
}> {
  const clientErrors = validateUpdateProfile(fields);

  if (Object.keys(clientErrors).length > 0) {
    return {
      success: false,
      errors: clientErrors,
    };
  }

  const result = await updateProfile(
    fields.username,
    fields.profile_image,
    fields.banner_image
  );

  if (!result.success) {
    const serverErrors: UpdateProfileErrors = {};

    try {
      const response = JSON.parse(result.message || "{}");
      if (response.errors && typeof response.errors === "object") {
        Object.entries(response.errors).forEach(([key, messages]) => {
          const msg = Array.isArray(messages) ? messages[0] : String(messages);
          if (
            key === "username" ||
            key === "profile_image" ||
            key === "banner_image"
          ) {
            serverErrors[key as keyof UpdateProfileErrors] = msg;
          }
        });
      }
    } catch {
      // geen JSON, geef gewoon het originele bericht terug
    }

    return {
      success: false,
      errors: serverErrors,
      message: result.message,
    };
  }

  return {
    success: true,
    errors: {},
    message: result.message,
  };
}
