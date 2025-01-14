import React from "react";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

function App() {
    const MapClickLogger = () => {
        useMapEvents({
          click: (e) => {
            console.log("Coordinates clicked:", e.latlng);
          },
        });
        return null; // to not render any ui
    };

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        TSP Visualizer
      </h2>
      <MapContainer
        center={[49.872872197840614, 8.651154041290285]}
        zoom={4}
        scrollWheelZoom={true}
        className="leaflet-container"
      >
        <TileLayer
            detectRetina={true}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            //url="https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png" // Minimalist tile
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"


        />
        <Marker position={[49.87384368679525, 8.631659746170046]}>
          <Popup>
            Studienkolleg
          </Popup>
        </Marker>
        <MapClickLogger/>
      </MapContainer>
    </div>
  );
}

export default App;

