import React, { useState, useEffect } from "react";
import { GeoJSON } from "react-leaflet";
const overpass = require("query-overpass");

export default function AddHospitals() {

    const [geojson, setGeojson] = useState(null)
    const [map, setMap] = useState(null)

    

    useEffect(() => {

        var dataHandler = (error, osmData) => {
            if(!error && osmData.features !== null) {
                setGeojson(osmData)
            }
        };

        const query = `[out:json];(way[healthcare~"^(hospital|clinic)$"](around:50000, -23.550519, -46.633309);\
        relation[healthcare~"^(hospital|clinic)$"](around:50000, -23.550519, -46.633309););\
        out center;>;out skel qt;`;

        const options = {
            flatProperties:  true
        };
        overpass(query, dataHandler, options)
    })

    return(
        geojson ? <GeoJSON data={geojson} /> : null
    )

}