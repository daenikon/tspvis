import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, Polyline } from "react-leaflet";

function App() {
  const [markers, setMarkers] = useState([]);
  const [lines, setLines] = useState([]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;

        setMarkers((prevMarkers) => {
          const newMarkers = [...prevMarkers, { lat, lng }];

          if (newMarkers.length > 1) {
            const prevNode = newMarkers[newMarkers.length - 2];
            setLines((prevLines) => [...prevLines, [prevNode, { lat, lng }]]);
          }

          return newMarkers;
        });

        console.log("Coordinates clicked:", { lat, lng });
        console.log("Array of current nodes:", markers);
        console.log("Array of current lines:", lines);
      },
    });
    return null; // No UI rendered
  };

  return (
    <div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", margin: "5px 40px"}}>
        <h2 style={{ textAlign: "center", margin: "20px 0" }}>TSP Visualizer</h2>
        <button style={{width: "80px", height: "40px", border: "1px solid lime"}}>Run</button>
      </div>
      <MapContainer
        center={[49.872872197840614, 8.651154041290285]}
        zoom={4}
        scrollWheelZoom={true}
        className="leaflet-container"
      >
        <TileLayer
          detectRetina={true}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
        />

        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              Marker at [{marker.lat.toFixed(5)}, {marker.lng.toFixed(5)}]
            </Popup>
          </Marker>
        ))}

        {lines.map((line, index) => (
          <Polyline
            key={index}
            pathOptions={{ color: "red" }}
            positions={[
              [line[0].lat, line[0].lng],
              [line[1].lat, line[1].lng],
            ]}
          />
        ))}

        <MapClickHandler />
      </MapContainer>
    </div>
  );
}

export default App;

