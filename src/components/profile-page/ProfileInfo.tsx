import type { ProfileVariant } from "@/types/ProfileVariant";
import { ProfileInfoClient } from "./ProfileInfoClient";
import BannerImage from "./BannerImage";
import AvatarImage from "./AvatarImage";

import { useProfileInfo } from "@/hooks/useProfileInfo";
import type { User } from "@/types/user";

interface ProfileInfoProps {
  variant: ProfileVariant;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  user: User | null;
}

export function ProfileInfo({
  variant,
  isEditing,
  setIsEditing,
  user,
}: ProfileInfoProps) {
  const isOwnProfile = variant === "my-profile";

  const {
    isReady,
    profileSrc,
    bannerSrc,
    setPreviewProfile,
    setPreviewBanner,
    profileInputRef,
    bannerInputRef,
    username,
  } = useProfileInfo(user);

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
        />
      </div>
    </div>
  );
}
