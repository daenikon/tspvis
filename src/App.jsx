import React from "react";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS
import "./index.css"; // Import updated custom styles
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Leaflet Map Example
      </h1>
      <MapContainer
        center={[51.505, -0.09]} // Initial center of the map
        zoom={13} // Initial zoom level
        scrollWheelZoom={true} // Enable scroll zoom
        className="leaflet-container" // Ensures the correct CSS class is applied
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;

