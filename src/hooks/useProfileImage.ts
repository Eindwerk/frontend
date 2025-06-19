import { useState, useRef, RefObject } from "react";

const FALLBACK_PROFILE =
  "https://groundpass-storage.ams3.digitaloceanspaces.com/fallback/fall-back-profile-image.png";
const FALLBACK_BANNER =
  "https://groundpass-storage.ams3.digitaloceanspaces.com/fallback/fall-back-banner-image.png";

export function useProfileImage(user: {
  banner_image: string | null | undefined;
  profile_image: string | null | undefined;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_ASSET_URL || "";
  const [previewProfile, setPreviewProfile] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const profileInputRef = useRef<HTMLInputElement>(
    null
  ) as RefObject<HTMLInputElement>;
  const bannerInputRef = useRef<HTMLInputElement>(
    null
  ) as RefObject<HTMLInputElement>;

  const getImageSrc = (val: string | undefined | null, fallback: string) => {
    if (!val || typeof val !== "string" || val.trim() === "") {
      return fallback;
    }
    return val.trim();
  };

  const bannerSrc =
    previewBanner || getImageSrc(user?.banner_image, FALLBACK_BANNER);
  const profileSrc =
    previewProfile || getImageSrc(user?.profile_image, FALLBACK_PROFILE);

  return {
    profileSrc: baseUrl + profileSrc,
    bannerSrc: baseUrl + bannerSrc,
    previewProfile,
    previewBanner,
    setPreviewProfile,
    setPreviewBanner,
    profileInputRef,
    bannerInputRef,
  };
}
