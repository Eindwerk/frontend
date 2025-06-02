"use client";

import React, { useState } from "react";
import Text from "../ui/Text";
import Image from "next/image";

const ImageContainer = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="new-post-page__image-container">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageSrc ? (
        <Image src={imageSrc} alt="Uploaded" width={500} height={500} />
      ) : (
        <Text variant="bold-blue-22">Drag & Drop your image here</Text>
      )}
    </label>
  );
};

export default ImageContainer;
