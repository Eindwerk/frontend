"use client";

import { useActionState } from "react";
import { toggleFollow } from "@/server-actions/toggleFollow";
import Button from "../ui/Button";

const initialState = false;

interface FollowButtonFormProps {
  own: boolean;
  isEditing?: boolean;
  setIsEditing?: (val: boolean) => void;
}

export default function FollowButtonForm({
  own,
  isEditing,
  setIsEditing,
}: FollowButtonFormProps) {
  const [isFollowing, formAction, isPending] = useActionState(
    toggleFollow,
    initialState
  );

  if (own) {
    const handleToggleEdit = () => {
      if (setIsEditing) setIsEditing(!isEditing);
    };

    return (
      <div className="profile__info-row__edit">
        <Button type="button" variant="primary" onClick={handleToggleEdit}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="profile__follow-form">
      <Button
        type="submit"
        variant={isFollowing ? "orange" : "primary"}
        disabled={isPending}
      >
        {isPending ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </form>
  );
}
