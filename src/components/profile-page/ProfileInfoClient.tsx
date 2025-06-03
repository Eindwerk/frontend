"use client";

import EditableName from "./EditableName";
import FollowButtonForm from "./FollowButtonForm";
import { Link, LandmarkIcon } from "lucide-react";
import type { ProfileVariant } from "@/types/ProfileVariant";

interface Props {
  own: boolean;
  variant: ProfileVariant;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export default function ProfileInfoClient({
  own,
  variant,
  isEditing,
  setIsEditing,
}: Props) {
  const icon =
    variant === "team" ? (
      <Link strokeWidth={1.5} />
    ) : variant === "stadium" ? (
      <LandmarkIcon strokeWidth={1.5} />
    ) : null;

  return (
    <div className="profile__info-content">
      <EditableName isEditing={isEditing} />
      <div className="profile__info-row">
        {icon && <div className="profile__info-icon">{icon}</div>}
        <FollowButtonForm
          own={own}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
    </div>
  );
}
