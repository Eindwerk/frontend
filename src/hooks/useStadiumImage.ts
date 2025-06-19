import { useState, useRef, RefObject } from "react";

export function useStadiumImage(stadium: {
  banner_image: string;
  logo_url: string;
}) {
  const BASE_URL = process.env.ASSET_URL || "";

  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(
    null
  ) as RefObject<HTMLInputElement>;
  const bannerInputRef = useRef<HTMLInputElement>(
    null
  ) as RefObject<HTMLInputElement>;

  const getImageSrc = (val: string | undefined | null, fallback: string) => {
    if (!val || !val.trim()) {
      return `${BASE_URL}/${fallback}`;
    }
    if (/^https?:\/\//i.test(val.trim())) {
      return val.trim();
    }
    return `${BASE_URL}/${val.trim()}`;
  };

  const logoSrc =
    previewLogo || getImageSrc(stadium?.logo_url, "img/profile.jpg");
  const bannerSrc =
    previewBanner || getImageSrc(stadium?.banner_image, "img/banner.jpg");

  return {
    logoSrc,
    bannerSrc,
    previewLogo,
    previewBanner,
    setPreviewLogo,
    setPreviewBanner,
    logoInputRef,
    bannerInputRef,
  };
}
