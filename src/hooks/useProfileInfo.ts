import { useProfileImage } from "@/hooks/useProfileImage";
import type { User } from "@/types/user";

const EMPTY_USER: User = {
  id: "",
  name: "",
  username: "",
  email: "",
  profile_image: null,
  banner_image: null,
};

export function useProfileInfo(user: User | null) {
  const safeUser = user ?? EMPTY_USER;

  const cleanedUser = {
    profile_image: safeUser.profile_image ?? "",
    banner_image: safeUser.banner_image ?? "",
  };

  const {
    profileSrc,
    bannerSrc,
    setPreviewProfile,
    setPreviewBanner,
    profileInputRef,
    bannerInputRef,
  } = useProfileImage(cleanedUser);

  return {
    isReady: !!user,
    profileSrc,
    bannerSrc,
    setPreviewProfile,
    setPreviewBanner,
    profileInputRef,
    bannerInputRef,
    username: user?.username || "",
  };
}
