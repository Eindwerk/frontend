import MapContainer from "@/components/map-page/MapContainer";

export const metadata = {
  title: "Map",
  description: "Explore the map to find stadiums",
};

const MapPage = () => {
  return (
    <div className="map-holder">
      <MapContainer />
    </div>
  );
};
export default MapPage;
