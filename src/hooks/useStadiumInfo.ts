import { useStadiumImage } from "@/hooks/useStadiumImage";
import type { ProfileData } from "@/types/profileData";

const EMPTY_STADIUM: ProfileData = {
  id: 0,
  name: "",
  username: "",
  profile_image: "",
  banner_image: "",
};

export function useStadiumInfo(stadium: ProfileData | null) {
  const safeStadium = stadium ?? EMPTY_STADIUM;

  const cleanedStadium = {
    logo_url: safeStadium.profile_image || "",
    banner_image: safeStadium.banner_image || "",
  };

  const {
    logoSrc,
    bannerSrc,
    setPreviewLogo,
    setPreviewBanner,
    logoInputRef,
    bannerInputRef,
  } = useStadiumImage(cleanedStadium);

  return {
    isReady: !!stadium,
    profileSrc: logoSrc,
    bannerSrc,
    setPreviewProfile: setPreviewLogo,
    setPreviewBanner,
    profileInputRef: logoInputRef,
    bannerInputRef,
    username: safeStadium.username,
  };
}
