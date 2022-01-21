import React, { useRef, useEffect, Component, useState } from 'react';
import ReactMapGl, { FlyToInterpolator, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYnV0dGVyZWR0b3N0IiwiYSI6ImNreW5obXBxNzA3bDcyb295b3AwcTA4aWcifQ.EMjNP02FhfdXBYq_GIUlUA'


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

    return (
        <div>
        <div ref={mapContainer} className="map-container" />
        </div>
        );
}