import type { ProfileVariant } from "@/types/ProfileVariant";
import { ProfileInfoClient } from "./ProfileInfoClient";
import BannerImage from "./BannerImage";
import AvatarImage from "./AvatarImage";

import { useProfileInfo } from "@/hooks/useProfileInfo";
import { useTeamInfo } from "@/hooks/useTeamInfo";
import { useStadiumInfo } from "@/hooks/useStadiumInfo";
import type { ProfileData } from "@/types/profileData";

interface ProfileInfoProps {
  variant: ProfileVariant;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  user: ProfileData | null;
  alreadyFollowed?: boolean;
}

export function ProfileInfo({
  variant,
  isEditing,
  setIsEditing,
  user,
  alreadyFollowed,
}: ProfileInfoProps) {
  const isOwnProfile = variant === "my-profile";

  // Alle hooks worden altijd aangeroepen
  const profile = useProfileInfo(user);
  const team = useTeamInfo(user);
  const stadium = useStadiumInfo(user);

  // Selecteer juiste resultaat
  const {
    isReady,
    profileSrc,
    bannerSrc,
    setPreviewProfile,
    setPreviewBanner,
    profileInputRef,
    bannerInputRef,
    username,
  } = variant === "team" ? team : variant === "stadium" ? stadium : profile;

  if (!isReady) return null;

  return (
    <div className="profile__header">
      <BannerImage
        src={bannerSrc}
        isEditing={isEditing}
        inputRef={bannerInputRef}
        onFileSelect={(file) => setPreviewBanner(URL.createObjectURL(file))}
      />
      <AvatarImage
        src={profileSrc}
        isEditing={isEditing}
        inputRef={profileInputRef}
        onFileSelect={(file) => setPreviewProfile(URL.createObjectURL(file))}
      />
      <div className="profile__info">
        <ProfileInfoClient
          own={isOwnProfile}
          username={username}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          profileImage={profileInputRef.current?.files?.[0]}
          bannerImage={bannerInputRef.current?.files?.[0]}
          userId={user?.id}
          followableType={variant}
          alreadyFollowed={alreadyFollowed}
        />
      </div>
    </div>
  );
}
