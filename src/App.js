import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { draw_outline, add_layer } from './data/polygons';

mapboxgl.accessToken = process.env.REACT_APP_ACCES_TOKEN;

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [lng, lat],
        zoom: zoom
        });
    });

     useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('load', () => {
        
        // Add a data source containing GeoJSON data.
        map.current.addSource('maine', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    // These coordinates outline Maine.
                    'coordinates': [
                        [
                            [-67.13734, 45.13745],
                            [-66.96466, 44.8097],
                            [-68.03252, 44.3252],
                            [-69.06, 43.98],
                            [-70.11617, 43.68405],
                            [-70.64573, 43.09008],
                            [-70.75102, 43.08003],
                            [-70.79761, 43.21973],
                            [-70.98176, 43.36789],
                            [-70.94416, 43.46633],
                            [-71.08482, 45.30524],
                            [-70.66002, 45.46022],
                            [-70.30495, 45.91479],
                            [-70.00014, 46.69317],
                            [-69.23708, 47.44777],
                            [-68.90478, 47.18479],
                            [-68.2343, 47.35462],
                            [-67.79035, 47.06624],
                            [-67.79141, 45.70258],
                            [-67.13734, 45.13745]
                        ]
                    ]
                }
            }
        });
        
        add_layer(map, 'maine')
        draw_outline(map, 'maine')
        
        // Add a raster on the map
        map.current.addSource('radar', {
            'type': 'image',
            'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
            'coordinates': [
                [-80.425, 46.437],
                [-71.516, 46.437],
                [-71.516, 37.936],
                [-80.425, 37.936]
                ]
            });
        map.current.addLayer({
            id: 'radar-layer',
            'type': 'raster',
            'source': 'radar',
            'paint': {
            'raster-fade-duration': 0
            }
            });
        });
    });
    
    return (
        <div>
            <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}