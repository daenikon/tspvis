import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl, Polyline, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet";

// Utils
import { createStartingNodeIcon, createNormalNodeIcon } from "../utils/createIcons";

interface MapComponentProps {
  markers: { lat: number; lng: number }[];
  setMarkers: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }[]>>;
  polylines: number[][];
  setPolylines: React.Dispatch<React.SetStateAction<number[][]>>;
}

const MapComponent: React.FC<MapComponentProps> = ({ markers, setMarkers, polylines }) => {
const MapClickHandler: React.FC = () => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      // Add new marker to the state
      setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);

      // Send the markers data to the backend for processing
      try {
        const response = await fetch('http://localhost:8080/api/nearestNeighbor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ points: [...markers, { lat, lng }] }), // Send updated markers list
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response from backend:', data); // Log the response from the backend
        } else {
          console.error('Failed to fetch data from backend');
        }
      } catch (error) {
        console.error('Error making the request:', error);
      }

      console.log('Current markers:', markers);
    },
  });

  return null;
};

  return (
    <MapContainer
      center={[49.872872197840614, 8.651154041290285]}
      zoom={6}
      scrollWheelZoom={true}
      className="leaflet-container"
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        detectRetina={true}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
      />

      <ZoomControl position="topright" />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={index === 0 ? createStartingNodeIcon() : createNormalNodeIcon()}
        >
          <Popup>
            {index === 0 ? "Start Node" : `Marker at [${marker.lat.toFixed(5)}, ${marker.lng.toFixed(5)}]`}
          </Popup>
        </Marker>
      ))}
      {polylines.map(([from, to], index) => (
        <Polyline
          key={index}
          positions={[
            [markers[from].lat, markers[from].lng],
            [markers[to].lat, markers[to].lng],
          ]}
          pathOptions={{ color: "gray" }}
        />
      ))}
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapComponent;

