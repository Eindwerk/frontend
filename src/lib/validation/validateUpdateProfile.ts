export interface UpdateProfileFields {
  username?: string;
  profile_image?: File;
  banner_image?: File;
}

export type UpdateProfileErrors = Partial<
  Record<keyof UpdateProfileFields, string>
>;

// Error constants
export const ERR_USERNAME_REQUIRED = "Username is required";
export const ERR_PROFILE_TOO_LARGE = "Profile image must be less than 8MB";
export const ERR_BANNER_TOO_LARGE = "Banner image must be less than 15MB";

const MAX_PROFILE_IMAGE_SIZE = 8 * 1024 * 1024; // 8MB
const MAX_BANNER_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB

export function validateUpdateProfile(
  values: UpdateProfileFields
): UpdateProfileErrors {
  const errors: UpdateProfileErrors = {};

  if (values.username !== undefined && !values.username.trim()) {
    errors.username = ERR_USERNAME_REQUIRED;
  }

  if (
    values.profile_image &&
    values.profile_image.size > MAX_PROFILE_IMAGE_SIZE
  ) {
    errors.profile_image = ERR_PROFILE_TOO_LARGE;
  }

  if (values.banner_image && values.banner_image.size > MAX_BANNER_IMAGE_SIZE) {
    errors.banner_image = ERR_BANNER_TOO_LARGE;
  }

  return errors;
}
