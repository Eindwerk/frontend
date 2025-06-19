import { useProfileImage } from "./useProfileImage";
import type { ProfileData } from "@/types/profileData";

const EMPTY_USER: ProfileData = {
  id: 0,
  name: "",
  username: "",
  profile_image: "",
  banner_image: "",
};

export function useProfileInfo(user: ProfileData | null) {
  const safeUser = user ?? EMPTY_USER;

  const cleanedUser = {
    profile_image: safeUser.profile_image || "",
    banner_image: safeUser.banner_image || "",
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
    username: safeUser.username,
    name: safeUser.name,
  };
}
