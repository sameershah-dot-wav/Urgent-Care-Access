import React, { useRef, useEffect, useCallback, Component, useState } from 'react';
import ReactMapGl, { FlyToInterpolator, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'


//https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/ ---- official mapbox documentation

//https://www.npmjs.com/package/react-map-gl-geocoder ---- geocoder code


mapboxgl.accessToken = 'pk.eyJ1IjoiYnV0dGVyZWR0b3N0IiwiYSI6ImNreW5obXBxNzA3bDcyb295b3AwcTA4aWcifQ.EMjNP02FhfdXBYq_GIUlUA'


function Geocoding() {
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    const mapRef = useRef();
    const geocoderContainerRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        },
        []
    );

    return (
        <div style={ { height: "100vh" } }>
            <div
                ref={geocoderContainerRef}
                style={{position: "absolute", top: 20, left: 20, zIndex: 1 }}
                />
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={mapboxgl.accessToken}
                >
                    <Geocoder
                        mapRef={mapRef}
                        containerRef={geocoderContainerRef}
                        onViewportChange={handleGeocoderViewportChange}
                        mapboxApiAccessToken={mapboxgl.accessToken}
                        position="top-right"
                        />
                </MapGL>
        </div>
    );
};


export default function Map() {

    const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);

useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
    });

    useEffect(() => {
        if (!map.current) return; //wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4))
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });


    return (
        <div>
            {/* <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}
        <div ref={mapContainer} className="map-container" />
        <Geocoding />
        </div>
        
        );
}