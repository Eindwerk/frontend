import Image from "next/image";
import BannerDummy from "@/../public/dummy/IMG_2900.jpg";
import ProfileDummy from "@/../public/dummy/DSC_0569.jpg";
import type { ProfileVariant } from "@/types/ProfileVariant";
import ProfileInfoClient from "./ProfileInfoClient";

interface ProfileInfoProps {
  variant: ProfileVariant;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const ProfileInfo = ({
  variant,
  isEditing,
  setIsEditing,
}: ProfileInfoProps) => {
  const isOwnProfile = variant === "my-profile";

  return (
    <div className="profile__header">
      <div className="profile__banner">
        <Image
          src={BannerDummy}
          alt="Banner Photo"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="profile__avatar">
        <Image
          src={ProfileDummy}
          alt="Profile Photo"
          fill
          sizes="5rem"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="profile__info">
        <ProfileInfoClient
          own={isOwnProfile}
          variant={variant}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
