"use client";

import { useActionState } from "react";
import { toggleFollow } from "@/server-actions/toggleFollow";
import Button from "../ui/Button";

interface FollowButtonFormProps {
  own: boolean;
  isEditing?: boolean;
  setIsEditing?: (val: boolean) => void;
}

const initialState = false;

export default function FollowButtonForm({
  own,
  isEditing = false,
  setIsEditing,
}: FollowButtonFormProps) {
  const handleToggleEdit = () => {
    if (setIsEditing) setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    // Add your logout logic here (e.g., call an auth signOut function)
    alert("Logged out!"); // Replace with real logic
  };

  // Always call hooks at the top level
  const [isFollowing, formAction, isPending] = useActionState(
    toggleFollow,
    initialState
  );

  // Show Edit/Logout if own profile
  if (own) {
    return (
      <form>
        <Button type="button" variant="primary" onClick={handleToggleEdit}>
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button type="button" variant="orange" onClick={handleLogout}>
          Logout
        </Button>
      </form>
    );
  }

  // Show Follow/Unfollow if not own profile
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
