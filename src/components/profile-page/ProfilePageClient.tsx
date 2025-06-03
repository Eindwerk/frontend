"use client";

import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import PostGrid from "./PostGrid";
import type { ProfileVariant } from "@/types/ProfileVariant";

interface ProfilePageClientProps {
  variant: ProfileVariant;
}

const ProfilePageClient = ({ variant }: ProfilePageClientProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile">
      <ProfileInfo
        variant={variant}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <PostGrid isEditing={isEditing} />
    </div>
  );
};

export default ProfilePageClient;
