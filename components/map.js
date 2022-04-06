import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useQuery } from 'react-query'
import styles from "../styles/map.module.css"
import { baseUrl } from '../helpers/strings'

export default function Map(props) {
    const maps = {
        base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    };
    const { isLoading, error, data } = useQuery('mapData', () =>
        fetch(`${baseUrl}/all/schedule`).then(res =>
            res.json()
        )
    )
    console.log(data);

    if (isLoading) return '...'

    if (error) return 'An error has occurred: ' + error.message

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
                <GeoJSON data={data.features.filter(ft => ft.properties.group === 'A')} style={style} />
                <GeoJSON data={data.features.filter(ft => ft.properties.group === 'B')} style={style} />
                <GeoJSON data={data.features.filter(ft => ft.properties.group === 'C')} style={style} />

            </MapContainer>

    )
}

function getColor(h) {

    let currentTimeHour = new Date().getHours()
    let lowerLimit = parseInt(h.substr(0, 2))
    //console.log(currentTimeHour);
    console.log((lowerLimit+6));
    if (currentTimeHour >= lowerLimit && currentTimeHour < (lowerLimit + 6)) {
        //console.log("true, lights off");
        return "#890F0D"
    } else {
        //console.log("false, lights on");
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
        color: "#D3D3D3",
        dashArray: '3',
        fillOpacity: 0.5
    };
};

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.area) {
        layer.bindPopup(feature.properties.area);
    }
}

