"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import DummyPicture from "@/../public/dummy/IMG_2900.jpg";
import Text from "../ui/Text";
import ConfirmOverlay from "../ui/ConfirmOverlay";

interface Props {
  isEditing?: boolean;
}

const ProfilePost = ({ isEditing = false }: Props) => {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClick = () => {
    if (!isEditing) {
      router.push("/post-detail");
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setConfirmOpen(false);
    console.log("Post deleted");
    // TODO: add actual delete logic (API call, local state update, etc.)
  };

  return (
    <>
      <div className="profile__post" onClick={handleClick}>
        <div className="profile__post-image">
          <Image src={DummyPicture} alt="Profile Post" />
        </div>

        <div className="profile__post-content subtext-white-12">
          <Text variant="subtext-white-12">KAA Gent - Anderlecht</Text>
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
