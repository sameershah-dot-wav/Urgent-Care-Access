import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  Circle
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import {AddHospitals} from "../components"




//Documentation for react-leaflet: https://react-leaflet.js.org/

//geolocation: https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs


const LeafIcon = L.Icon.extend({
  options: {},
});


function LocationMarker() {
  const [position, setPosition] = useState(null);


  const fillBlueOptions = { fillColor: "blue" };

  const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
  });

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      map.panTo(e.latlng);
    },
  });


  return position === null ? null : (
    <>
      <Circle center={position} pathOptions={fillBlueOptions} radius={1000} />
      <Marker position={position} icon={greenIcon}>
        <Popup>You are here</Popup>
      </Marker>
    </>
  );
}



function HospitalMap() {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const cardiffRoyal = [51.485, -3.1626];

  const charingCross = [51.4869, -0.2196];


  return (
    <MapContainer
      center={cardiffRoyal}
      zoom={13}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      style={{
        height: "1000px", //This field is required for rendering the map correctly
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={cardiffRoyal}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <LocationMarker />
      <AddHospitals />
    </MapContainer>
    
  );
}

export default HospitalMap;
