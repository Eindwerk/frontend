"use client";

import React from "react";
import Text from "../ui/Text";
import Image from "next/image";

interface Props {
  imageSrc: string | null;
  onImageChange: (file: File, previewUrl: string) => void;
}

const ImageContainer: React.FC<Props> = ({ imageSrc, onImageChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="new-post-page__image-container">
      <label className="new-post-page__image-container__label">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {imageSrc ? (
          <Image src={imageSrc} alt="Uploaded" width={500} height={500} />
        ) : (
          <Text variant="bold-blue-22">Drag & Drop your image here</Text>
        )}
      </label>
    </div>
  );
};

export default ImageContainer;
