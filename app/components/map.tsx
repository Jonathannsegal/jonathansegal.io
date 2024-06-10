'use client';

import MapView from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
    return (
        <MapView
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
                longitude: -73.9576,
                latitude: 40.7555,
                zoom: 15.7,
                bearing: -96,
                pitch: 75,
            }}
            interactive={false}
            style={{ width: '100%', height: '100%', borderRadius: '0.5em' }}
            mapStyle="mapbox://styles/mapbox/standard"
            attributionControl={false}
        />
    );
}