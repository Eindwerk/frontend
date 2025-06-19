import { useState, useRef, RefObject } from "react";

const FALLBACK_POST_IMAGE =
  "https://groundpass-storage.ams3.digitaloceanspaces.com/fallback/fall-back-banner-image.png"; // relatieve fallback (pas aan)

export function usePostImage(post: { image: string | null | undefined }) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(
    null
  ) as RefObject<HTMLInputElement>;

  const getImageSrc = (val: string | undefined | null, fallback: string) => {
    if (!val || typeof val !== "string" || val.trim() === "") {
      return fallback;
    }
    return val.trim();
  };

  const imageSrc = previewImage || getImageSrc(post.image, FALLBACK_POST_IMAGE);

  return {
    imageSrc,
    previewImage,
    setPreviewImage,
    imageInputRef,
  };
}
