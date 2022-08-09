import React from "react";
import { areasAtoms } from "@/state/data";
import { useAtom } from "jotai";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

function D3GeoMap() {
  const [areas, setAreas] = useAtom(areasAtoms);
  const rn = React.useRef<SVGSVGElement>(null);
  const data =
    areas?.map((e) => ({
      type: "Feature",
      properties: { name: e.name },
      geometry: e.geometry,
    })) ?? [];

  console.log(data);

  return (
    <ComposableMap
      projection="geoOrthographic"
      projectionConfig={{
        center: [ 35.04702087069704, -15.708299283216842],
        scale: 4100,
      }}
    >
        
      <Geographies geography={"/districts.geojson"}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              // fill="#FF5533"
              // stroke="#000000"
              className="fill-green-500 dark:fill-slate-800"
            />
          ))
        }
      </Geographies>
      
    </ComposableMap>
  );
}

export default D3GeoMap;
