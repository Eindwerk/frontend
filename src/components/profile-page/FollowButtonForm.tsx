"use client";

import { startTransition, useActionState } from "react";
import { signOut } from "@/lib/actions/signOut";
import { updateProfile } from "@/lib/actions/updateProfile";
import { toggleFollow } from "@/lib/actions/toggleFollow";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

export function FollowButtonForm({
  own,
  isEditing,
  setIsEditing,
  newName,
  profileImage,
  bannerImage,
  userId,
  alreadyFollowed,
  followableType,
}: {
  own: boolean;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  newName: string;
  profileImage?: File;
  bannerImage?: File;
  userId?: number;
  alreadyFollowed?: boolean;
  followableType?: string;
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(toggleFollow, {
    success: !!alreadyFollowed,
    message: "",
  });

  const isFollowing = state.success;

  const handleEditOrSave = () => {
    if (isEditing) {
      startTransition(async () => {
        const result = await updateProfile(newName, profileImage, bannerImage);

        if (result.success) {
          setIsEditing(false);
          router.push("/profile/my-profile");
        } else {
          console.error("Save failed:", result.message);
        }
      });
    } else {
      setIsEditing(true);
    }
  };

  if (own) {
    return (
      <>
        <Button type="button" variant="primary" onClick={handleEditOrSave}>
          {isEditing ? "Save" : "Edit"}
        </Button>
        <form action={signOut}>
          <Button type="submit" variant="orange">
            Logout
          </Button>
        </form>
      </>
    );
  }

  return (
    <form action={formAction} className="profile__follow-form">
      <input type="hidden" name="followable_id" value={userId} />
      <input type="hidden" name="followable_type" value={followableType} />

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
