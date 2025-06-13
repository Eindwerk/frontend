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

export default function BannerImage({
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

  const isDefault = src.endsWith("/img/banner.jpg");

  return (
    <div className="profile__banner-wrapper">
      <Image
        className="profile__banner-image"
        src={src}
        alt="Banner"
        width={800}
        height={300}
        style={{ objectFit: "cover" }}
        priority
      />
      {isEditing && (
        <>
          <div
            className="profile__overlay"
            onClick={() => inputRef.current?.click()}
          >
            <Text variant={isDefault ? "bold-space-20" : "bold-white-20"}>
              Upload banner
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
