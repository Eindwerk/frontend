"use client";

import { renderToStaticMarkup } from "react-dom/server";
import { LandmarkIcon } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Stadium } from "@/types/stadium";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import useSWR from "swr";
import { useEffect, useState } from "react";

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

const MapComponent = ({
  setClickedStadium,
}: {
  setClickedStadium: React.Dispatch<React.SetStateAction<Stadium | null>>;
}) => {
  const [center, setCenter] = useState({ lat: 50, lng: 4 });
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/stadiums", fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      const markers: { location: [number, number] }[] = data.map(
        (stadium: Stadium) => ({
          location: [stadium.latitude, stadium.longitude],
        })
      );

      const bounds = L.latLngBounds(markers.map((marker) => marker.location));

      const center = bounds.getCenter();
      setCenter({
        lat: center.lat,
        lng: center.lng,
      });
    }
  }, [data]);

  // Component to imperatively update map center
  const RecenterMap = ({
    center,
  }: {
    center: { lat: number; lng: number };
  }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([center.lat, center.lng]);
    }, [center, map]);
    return null;
  };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={5}
      scrollWheelZoom={false}
      className="leaflet-container"
    >
      <RecenterMap center={center} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />
      <MarkerClusterGroup>
        {data &&
          data.map((stadium: Stadium) => (
            <Marker
              icon={customIcon}
              key={stadium.id}
              position={[Number(stadium.latitude), Number(stadium.longitude)]}
              eventHandlers={{
                click: () => {
                  setClickedStadium({
                    ...stadium,
                  });
                },
              }}
            />
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComponent;
