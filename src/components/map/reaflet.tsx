import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import styles from "@/styles/map.module.css";
import clsx from "clsx";
import { areasAtoms } from "@/state/data";
import { useAtom } from "jotai";

interface IReafletMap {
  className?: string;
}

const ReafletMap = ({ className }: IReafletMap) => {
  const [areas, setAreas] = useAtom(areasAtoms);
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

        <GeoJSON
          data={areas?.map((e) => ({ type: "Feature", properties: {name: e.name}, geometry: e.geometry }))}
          style={{
            width: "100%",
            borderRadius: 20,
            height: "50vh",
          }}
          onEachFeature={(feature: GeoJSON.Feature<GeoJSON.GeometryObject>, layer: Layer) => {
            layer.on({
              'mouseover': (e: LeafletMouseEvent) => {
                // const country = state.countries[e.target.feature.properties.adm0_a3];
                // layer.bindTooltip(country.tooltip);
                // layer.openTooltip(country.latlng);
                console.log(e);
                
              },
              'mouseout': () => {
                layer.unbindTooltip();
                layer.closeTooltip();
              },
            });
          }}
        />
      </MapContainer>
    </div>
  );
};

export default ReafletMap;
