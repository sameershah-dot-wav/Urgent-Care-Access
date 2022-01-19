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

        //around: [this is the distance in meters from the coordinates]

        const query = `[out:json];(way[healthcare~"^(hospital|clinic)$"](around:10000, 51.485, -3.1626);\
        relation[healthcare~"^(hospital|clinic)$"](around:10000, 51.485, -3.1626););\
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