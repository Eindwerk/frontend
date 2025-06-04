"use client";

import { useActionState } from "react";
import { signOut } from "@/lib/actions/signOut"; // <== importeren
import { toggleFollow } from "@/server-actions/toggleFollow";
import Button from "../ui/Button";

interface FollowButtonFormProps {
  own: boolean;
  isEditing?: boolean;
  setIsEditing?: (val: boolean) => void;
}

const initialFollowState = false;

export default function FollowButtonForm({
  own,
  isEditing = false,
  setIsEditing,
}: FollowButtonFormProps) {
  const handleToggleEdit = () => {
    if (setIsEditing) setIsEditing(!isEditing);
  };

  const [isFollowing, formAction, isPending] = useActionState(
    toggleFollow,
    initialFollowState
  );

  if (own) {
    return (
      <>
        <Button type="button" variant="primary" onClick={handleToggleEdit}>
          {isEditing ? "Save" : "Edit"}
        </Button>

        {/* Logout button that triggers server action */}
        <form action={signOut}>
          <Button type="submit" variant="orange">
            Logout
          </Button>
        </form>
      </>
    );
  }

  return (
    <form
      action={formAction}
      className="profile-page__info__buttons__follow__form"
    >
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
