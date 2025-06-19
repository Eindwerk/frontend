import { useTeamImage } from "@/hooks/useTeamImage";
import type { ProfileData } from "@/types/profileData";

const EMPTY_TEAM: ProfileData = {
  id: 0,
  name: "",
  username: "",
  profile_image: "",
  banner_image: "",
};

export function useTeamInfo(team: ProfileData | null) {
  const safeTeam = team ?? EMPTY_TEAM;

  const cleanedTeam = {
    logo_url: safeTeam.profile_image || "",
    banner_image: safeTeam.banner_image || "",
  };

  const {
    logoSrc,
    bannerSrc,
    setPreviewLogo,
    setPreviewBanner,
    logoInputRef,
    bannerInputRef,
  } = useTeamImage(cleanedTeam);

  return {
    isReady: !!team,
    profileSrc: logoSrc,
    bannerSrc,
    setPreviewProfile: setPreviewLogo,
    setPreviewBanner,
    profileInputRef: logoInputRef,
    bannerInputRef,
    username: safeTeam.username,
  };
}
