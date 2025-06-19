import { useState, useRef, RefObject } from "react";

const FALLBACK_LOGO =
  "https://groundpass-storage.ams3.digitaloceanspaces.com/fallback/fall-back-profile-image.png";
const FALLBACK_BANNER =
  "https://groundpass-storage.ams3.digitaloceanspaces.com/fallback/fall-back-banner-image.png";

export function useTeamImage(team: {
  banner_image: string | null | undefined;
  logo_url: string | null | undefined;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_ASSET_URL || "";

  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(
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

  const logoSrc = previewLogo || getImageSrc(team?.logo_url, FALLBACK_LOGO);
  const bannerSrc =
    previewBanner || getImageSrc(team?.banner_image, FALLBACK_BANNER);

  return {
    logoSrc: baseUrl + logoSrc,
    bannerSrc: baseUrl + bannerSrc,
    previewLogo,
    previewBanner,
    setPreviewLogo,
    setPreviewBanner,
    logoInputRef,
    bannerInputRef,
  };
}
