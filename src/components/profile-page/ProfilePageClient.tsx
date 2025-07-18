"use client";

import { useState } from "react";
import { ProfileVariant } from "@/types/ProfileVariant";
import { ProfileInfo } from "./ProfileInfo";
import PostGrid from "./PostGrid";
import type { ProfileData } from "@/types/profileData";
import { Post } from "@/types/post";

interface ProfilePageClientProps {
  variant: ProfileVariant;
  user: ProfileData | null;
  posts?: Post[];
  alreadyFollowed?: boolean;
}

const ProfilePageClient = ({
  variant,
  user,
  posts,
  alreadyFollowed,
}: ProfilePageClientProps) => {
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
        alreadyFollowed={alreadyFollowed}
      />
      <PostGrid isEditing={isEditing} posts={posts} />
    </div>
  );
};

export default ProfilePageClient;
