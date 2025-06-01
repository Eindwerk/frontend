"use client";

import Text from "../ui/Text";
import { Navigation } from "lucide-react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./Map"), { ssr: false });

const MapContainer = () => {
  return (
    <>
      <div className="map-holder__title">
        <Text variant="bold-blue-22">MAP</Text>
      </div>
      <div className="map-holder__container">
        <MapComponent />
      </div>
      <div className="map-holder__detail">
        <div className="map-holder__detail__text">
          <Text variant="bold-blue-22">KAA Gent</Text>
          <Text variant="subtext-spaceblue-12">Planet Group Arena</Text>
        </div>
        <div className="map-holder__detail__icon">
          <Navigation strokeWidth={1} />
        </div>
      </div>
    </>
  );
};

export default MapContainer;
