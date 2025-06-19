"use client";

import { useEffect, useState } from "react";
import Text from "./ui/Text";
import Button from "./ui/Button";

const DesktopWarning = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDesktop = window.innerWidth >= 650;
      if (isDesktop) {
        setShowPopup(true);
      }
    }
  }, []);

  if (!showPopup) return null;

  return (
    <div className="desktop-popup">
      <div className="desktop-popup__overlay" />
      <div className="desktop-popup__modal">
        <Text variant="regular-white-15">
          Deze applicatie is geoptimaliseerd voor mobiele apparaten. Voor de
          beste ervaring, gebruik een smartphone of tablet.
        </Text>
        <div className="desktop-popup__modal-button">
          <Button onClick={() => setShowPopup(false)} variant="orange">
            Sluiten
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesktopWarning;
