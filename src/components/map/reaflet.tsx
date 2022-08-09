import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import LeafLet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import styles from "@/styles/map.module.css";
import clsx from "clsx";
import { areasAtoms } from "@/state/data";
import { useAtom } from "jotai";
import { useState } from "react";

interface IReafletMap {
  className?: string;
}

const ReafletMap = ({ className }: IReafletMap) => {
  const [areas, setAreas] = useAtom(areasAtoms);
  const [currentArea, setCurrentArea] = useState<any | undefined>();
  const { isLoading, data } = useQuery(["map"], async () => {
    const res = await fetch("/districts.geojson");
    return await res.json();
  });

  return (
    <div className={clsx(className)}>
      <MapContainer
        center={[-13.973922, 33.756947]}
        zoom={8}
        scrollWheelZoom={true}
        maxBounds={LeafLet.latLngBounds([
          -17.293232, 32.651239, -8.648196, 35.332659,
        ])}
        className={styles.map}
      >
        {data && (
          <GeoJSON
            data={data}
            style={{
              width: "100%",
              borderRadius: 20,
              height: "50vh",
              className:
                "fill-green-600 dark:fill-slate-800 stroke-red-800 dark:stroke-purpe-800",
            }}
            eventHandlers={{
              click: (feature: any) => {
                console.log(feature);
                setCurrentArea(feature.layer.feature.properties);
              },
            }}
          >
            <Popup>
              A pretty CSS3 popup. <br /> {currentArea?.REGION}.
            </Popup>
          </GeoJSON>
        )}

        <GeoJSON
          data={areas?.map((e) => ({
            type: "Feature",
            properties: { name: e.name },
            geometry: e.geometry,
          }))}
          style={{
            width: "100%",
            borderRadius: 20,
            height: "50vh",
            color: "red",
          }}
        />
      </MapContainer>
    </div>
  );
};

export default ReafletMap;
