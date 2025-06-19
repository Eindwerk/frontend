"use client";

import { useState } from "react";
import { EditableName } from "./EditableName";
import { FollowButtonForm } from "./FollowButtonForm";

export function ProfileInfoClient({
  own,
  username,
  isEditing,
  setIsEditing,
  profileImage,
  bannerImage,
  userId,
  followableType,
  alreadyFollowed,
}: {
  own: boolean;
  username: string;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  profileImage?: File;
  bannerImage?: File;
  userId?: number;
  followableType?: string;
  alreadyFollowed?: boolean;
}) {
  const [newName, setNewName] = useState(username);

  return (
    <div className="profile__info-content">
      <EditableName
        isEditing={isEditing}
        newName={newName}
        setNewName={setNewName}
      />
      <div className="profile__info-row">
        <FollowButtonForm
          userId={userId}
          followableType={followableType}
          own={own}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          newName={newName}
          profileImage={profileImage}
          bannerImage={bannerImage}
          alreadyFollowed={alreadyFollowed}
        />
      </div>
    </div>
  );
}
