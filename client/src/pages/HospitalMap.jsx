import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";


//Documentation: https://react-leaflet.js.org/



function HospitalMap() {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });


  L.Marker.prototype.options.icon = DefaultIcon;

  const position1 = [51.505, -0.09]

  const position2 = [49.505, -0.02]


  return (

    <MapContainer
      center={position1}
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
      <Marker position={position1}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      <Marker position={position2}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default HospitalMap;
