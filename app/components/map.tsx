'use client';

import { useRef } from 'react';
import MapView, { MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
    const mapRef = useRef<MapRef | null>(null);

    const handleLoad = () => {
        if (mapRef.current) {
            const map = mapRef.current.getMap();

            const currentHour = new Date().getHours();
            const lightPreset = currentHour >= 18 || currentHour < 6 ? 'night' : 'day';

            map.setConfigProperty('basemap', 'lightPreset', lightPreset);
        }
    };

    return (
        <MapView
            ref={mapRef}
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
            onLoad={handleLoad}
        />
    );
}
