"use client";

import { useState } from "react";
import { ProfileVariant } from "@/types/ProfileVariant";
import { ProfileInfo } from "./ProfileInfo";
import PostGrid from "./PostGrid";
import type { User } from "@/types/user";

interface ProfilePageClientProps {
  variant: ProfileVariant;
  user: User | null;
}

const ProfilePageClient = ({ variant, user }: ProfilePageClientProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const sanitizedUser =
    user && user.name && user.username
      ? {
          ...user,
          profile_image: user.profile_image ?? "",
          banner_image: user.banner_image ?? "",
        }
      : null;

  return (
    <div className="profile">
      <ProfileInfo
        variant={variant}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        user={sanitizedUser}
      />
      <PostGrid isEditing={isEditing} />
    </div>
  );
};

export default ProfilePageClient;
