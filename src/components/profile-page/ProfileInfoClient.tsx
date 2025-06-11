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
}: {
  own: boolean;
  username: string;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  profileImage?: File;
  bannerImage?: File;
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
          own={own}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          newName={newName}
          profileImage={profileImage}
          bannerImage={bannerImage}
        />
      </div>
    </div>
  );
}
