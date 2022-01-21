import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L, { Icon } from 'leaflet'
import * as parkData from "../data/skateboard-parks.json"
import 'leaflet/dist/leaflet.css'

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowURL: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function HospitalMap() {

    return (
        <Map center={[45.421532, -75.697189]} zoom={12}>
            <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {parkData.features.map(park => (
          <Marker key={park.properties.PARK_ID}
           position=
           {[park.geometry.coordinates[1],
            park.geometry.coordinates[0]
            ]}
         />
      ))}
        </Map>
    )
}