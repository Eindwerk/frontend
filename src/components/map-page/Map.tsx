"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { LandmarkIcon } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const svgMarkup = `
  <div class="custom-marker-wrapper">
    ${renderToStaticMarkup(<LandmarkIcon size={32} strokeWidth={2} />)}
  </div>
`;

const customIcon = L.divIcon({
  className: "",
  html: svgMarkup,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

const MapComponent = () => {
  return (
    <MapContainer
      center={[51.0363, 3.75]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />
      <Marker position={[51.0363, 3.75]} icon={customIcon}>
        <Popup>Planet Group Arena</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
