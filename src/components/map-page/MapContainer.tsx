"use client";

import { slugify } from "@/lib/utils/slugify";
import Text from "../ui/Text";
import { Navigation } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Stadium } from "@/types/stadium";

const MapComponent = dynamic(() => import("./Map"), { ssr: false });

const MapContainer = () => {
  const [clickedStadium, setClickedStadium] = useState<Stadium | null>(null);

  return (
    <>
      <div className="map-holder__title">
        <Text variant="bold-blue-22">MAP</Text>
      </div>
      <div className="map-holder__container">
        <MapComponent setClickedStadium={setClickedStadium} />
      </div>
      {clickedStadium && (
        <div className="map-holder__detail">
          <div className="map-holder__detail__text">
            <Link
              href={`profile/stadium/${clickedStadium?.id}/${slugify(
                clickedStadium?.name || ""
              )}`}
            >
              <Text variant="bold-blue-22">{clickedStadium?.name}</Text>
            </Link>
            <Link
              href={`profile/stadium/${clickedStadium?.id}/${slugify(
                clickedStadium?.name || ""
              )}`}
            >
              <Text variant="subtext-spaceblue-12">{clickedStadium?.name}</Text>
            </Link>
          </div>
          <div className="map-holder__detail__icon">
            <Link
              href={`http://maps.google.com/maps?q=${clickedStadium?.latitude},${clickedStadium?.longitude}`}
              target="_blank"
            >
              <Navigation strokeWidth={1} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MapContainer;
