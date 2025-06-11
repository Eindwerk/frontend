import { useState, useRef, RefObject } from "react";

export function useProfileImage(user: {
  banner_image: string;
  profile_image: string;
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const profileInputRef = useRef<HTMLInputElement>(
    null
  ) as RefObject<HTMLInputElement>;
  const bannerInputRef = useRef<HTMLInputElement>(
    null
  ) as RefObject<HTMLInputElement>;

  const getImageSrc = (val: string | undefined | null, fallback: string) =>
    val?.trim() ? `${BASE_URL}/${val}` : `${BASE_URL}/${fallback}`;

  const bannerSrc =
    previewBanner || getImageSrc(user?.banner_image, "img/banner.jpg");
  const profileSrc =
    previewProfile || getImageSrc(user?.profile_image, "img/profile.jpg");

  return {
    profileSrc,
    bannerSrc,
    previewProfile,
    previewBanner,
    setPreviewProfile,
    setPreviewBanner,
    profileInputRef,
    bannerInputRef,
  };
}
