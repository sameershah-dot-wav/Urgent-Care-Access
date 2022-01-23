import React, {useState, useEffect} from 'react';
import { Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L, { Icon } from 'leaflet'
import * as hospitalData from "../data/hospitals.json"
import 'leaflet/dist/leaflet.css'
import api from "../api";


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





L.Marker.prototype.options.icon = DefaultIcon;

function LocateHospitals() {

    const [hospitals, setHospitals] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetchData();
    
        async function fetchData() {
          setLoading(true);
    
          const response = await api.getAllHospitals();
    
          const data = response.data;
    
          setHospitals(data);

        }
      }, []);


      useEffect(() => {
        setLoading(false);
      }, [hospitals]);


     
      if(hospitals.data) {
          return <Marker
                    position={[hospitals.data[0].latitude, hospitals.data[0].longitude]}
                    />
      } else {
          console.log("no hospitals")
      }


      
      return null;

      

 }
        

export default function HospitalMap() {

    const [activeHospital, setActiveHospital] = useState(null);

    const [lat, setLat] = useState(51.5175)
    const [lng, setLng] = useState(-0.1000)

      

    useEffect(() => {
        getLocation()

        async function getLocation() {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
            })
        }
    })

    
    

   

    return (
        <>
        
       
        <Map center={[lat, lng]} zoom={12}>
            <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      

      {hospitalData.features.map(hospital => (
        <Marker
          key={hospital.properties.PARK_ID}
          position={[
            hospital.geometry.coordinates[1],
            hospital.geometry.coordinates[0]
          ]}
          onClick={() => {
            setActiveHospital(hospital);
          }}
          
        />
      ))}

      {activeHospital && (
        <Popup
          position={[
            activeHospital.geometry.coordinates[1],
            activeHospital.geometry.coordinates[0]
          ]}
          onClose={() => {
            setActiveHospital(null);
          }}
        >
          <div>
            <h2>{activeHospital.properties.NAME}</h2>
            <p>{activeHospital.properties.POSTCODE}</p>
          </div>
        </Popup>
      )}

        <LocateHospitals />

        </Map>
        </>
    )
}