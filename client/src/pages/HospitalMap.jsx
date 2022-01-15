import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";


//Documentation for react-leaflet: https://react-leaflet.js.org/

//geolocation: https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs



function LocationMarker() {
    const [position, setPosition] = useState(null)

    const fillBlueOptions = { fillColor: 'blue' }

    const map = useMapEvents({
        click() {
          map.locate()
        },
        locationfound(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng, map.getZoom())
          map.panTo(e.latlng)
        },
      })

      return position === null ? null : (
          <>
          <Circle center={position} pathOptions={fillBlueOptions} radius={1000} />
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
        </>
      )
}

function HospitalMap() {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const stMarys = [51.5176, -0.1743]

  const charingCross = [51.4869, -0.2196]


  return (

    <MapContainer
      center={stMarys}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "1000px", //This field is required for rendering the map correctly
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={stMarys}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <LocationMarker />
    </MapContainer>
  );
}

export default HospitalMap;
