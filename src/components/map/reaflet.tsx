import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import styles from "@/styles/map.module.css";
import clsx from "clsx";

interface IReafletMap {
  className?: string;
}

const ReafletMap = ({ className }: IReafletMap) => {
  const maps = {
    base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  };

  return (
    <div className={clsx(className)}>
      <MapContainer
        center={[-13.973922, 33.756947]}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={maps.base}
        />
      </MapContainer>
    </div>
  );
};

export default ReafletMap;
