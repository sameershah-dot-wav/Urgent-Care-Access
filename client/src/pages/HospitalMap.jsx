import React, {useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import L, { Icon } from 'leaflet'
import * as parkData from "../data/skateboard-parks.json"
import 'leaflet/dist/leaflet.css'


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowURL: iconShadow
});

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  function LocationMarker() {

    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        click() {
          map.locate()
        },
        locationfound(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng, map.getZoom())
        },
      })

      return position === null ? null :(
          <Marker position={position}
          icon={greenIcon}>
              <Popup>You Are Here</Popup>
          </Marker>
      )

  }





L.Marker.prototype.options.icon = DefaultIcon;

export default function HospitalMap() {

    const [activePark, setActivePark] = useState(null);
   

    return (
        <MapContainer center={[45.421532, -75.697189]} zoom={12}>
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
            onClick={()=> {
                setActivePark(park);
            }}
            >
            </Marker>
        ))}

        {activePark && (
            <Popup
                position={[
                    activePark.geometry.coordinates[1],
                    activePark.geometry.coordinates[0]
                ]}
                onClose={() => {
                    setActivePark(null)
                }}
                >
                    <div>
                        <h2>{activePark.properties.NAME}</h2>
                        <p>{activePark.properties.DESCRIPTIO}</p>
                    </div>
                </Popup>
        )}

        <LocationMarker/>
        </MapContainer>
    )
}