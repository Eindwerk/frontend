"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Text from "../ui/Text";
import ConfirmOverlay from "../ui/ConfirmOverlay";
import type { Post } from "@/types/post";

import { usePostInfo } from "@/hooks/usePostInfo";
import { deletePost } from "@/lib/actions/deletePost";

interface Props {
  isEditing?: boolean;
  post: Post;
}

const ProfilePost = ({ isEditing = false, post }: Props) => {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { imageSrc, isReady } = usePostInfo(post);

  // Haal title direct uit post object (want usePostInfo geeft die niet)
  const title = post.title ?? "Profile Post";

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setConfirmOpen(false);
    deletePost(post.id);
    router.refresh();
  };

  if (!isReady) return null; // of loader tonen

  return (
    <>
      <div className="profile__post">
        <div className="profile__post-image">
          <Image
            src={imageSrc}
            alt={title}
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="profile__post-content subtext-white-12">
          <Text variant="subtext-white-12">{title}</Text>
        </div>

        {isEditing && (
          <div className="profile__post-overlay">
            <div className="profile__post-overlay__icon" onClick={handleDelete}>
              <Trash2 />
            </div>
          </div>
        )}
      </div>

      {confirmOpen && (
        <ConfirmOverlay
          message="Are you sure you want to delete this post?"
          confirmText="Yes"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </>
  );
};

export default ProfilePost;
