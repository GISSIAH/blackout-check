import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import "leaflet/dist/leaflet.css"


import styles from "../styles/map.module.css"

import axios from 'axios';
export default function Map(props) {
    const maps = {
        base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    };
    
    
    return (
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
            <GeoJSON pathOptions={{ color: 'yellow' }} data={props.groupA} />
            <GeoJSON pathOptions={{ color: 'red' }} data={props.groupB} />
            <GeoJSON pathOptions={{ color: 'blue' }} data={props.groupC} />

        </MapContainer>
    )
}