import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import "leaflet/dist/leaflet.css"


import styles from "../styles/map.module.css"

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
            <GeoJSON  data={props.groupA} style={style}     />
            <GeoJSON  data={props.groupB} style={style}  />
            <GeoJSON  data={props.groupC} style={style} />

        </MapContainer>
    )
}

function getColor(h){
    
    let currentTimeHour = new Date().getHours()
    let lowerLimit = parseInt(h.substr(0,2))
    console.log(currentTimeHour);
    //console.log(currentTimeHour,lowerLimit,(lowerLimit+6));
    if (currentTimeHour >= lowerLimit && currentTimeHour <= (lowerLimit+6) ){
        return "#808080"
    }else{
        return "#228C22"
    }
}
function style(feature) {
    let d = new Date().getDay()
    return {
        // the fillColor is adapted from a property which can be changed by the user (segment)
        fillColor: getColor(feature.properties.schedule[d]),
        weight: 0.3,
        //stroke-width: to have a constant width on the screen need to adapt with scale 
        opacity: 1,
        color:"#D3D3D3",
        dashArray: '3',
        fillOpacity: 0.5
    };
};

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.area) {
        layer.bindPopup(feature.properties.area);
    }
}