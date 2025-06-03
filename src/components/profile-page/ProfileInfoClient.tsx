"use client";

import EditableName from "./EditableName";
import FollowButtonForm from "./FollowButtonForm";
import { Link, LandmarkIcon } from "lucide-react";
import { ProfileVariant } from "@/types/ProfileVariant";

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
  const renderIcon = () => {
    if (variant === "team") return <Link strokeWidth={1.5} />;
    if (variant === "stadium") return <LandmarkIcon strokeWidth={1.5} />;
    return null;
  };

  const icon = renderIcon();

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
