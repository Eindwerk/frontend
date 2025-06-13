"use client";

import Image from "next/image";
import Text from "../ui/Text";
import { RefObject } from "react";

interface Props {
  src: string;
  isEditing: boolean;
  inputRef: RefObject<HTMLInputElement>;
  onFileSelect: (file: File) => void;
  error?: string;
}

export default function AvatarImage({
  src,
  isEditing,
  inputRef,
  onFileSelect,
  error,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const isDefault = src.endsWith("/img/profile.jpg");

  return (
    <div className="profile__avatar-wrapper">
      <Image
        className="profile__avatar-image"
        src={src}
        alt="Profile Photo"
        width={50}
        height={50}
        priority
      />
      {isEditing && (
        <>
          <div
            className="profile__overlay profile__avatar-overlay"
            onClick={() => inputRef.current?.click()}
          >
            <Text
              variant={isDefault ? "subtext-spaceblue-12" : "subtext-white-12"}
            >
              Change avatar
            </Text>
          </div>
          {error && <Text variant="subtext-red-12">{error}</Text>}
        </>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
}
