"use client";

import { useActionState } from "react";
import { toggleFollow } from "@/server-actions/toggleFollow";
import Button from "../ui/Button";

const initialState = false;

export default function FollowButtonForm() {
  const [isFollowing, formAction, isPending] = useActionState(
    toggleFollow,
    initialState
  );

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
