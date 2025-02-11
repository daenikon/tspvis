import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl, Polyline, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet";

import { createStartingNodeIcon, createNormalNodeIcon } from "../utils/createIcons";

interface MapComponentProps {
  markers: { lat: number; lng: number }[];
  setMarkers: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }[]>>;
  polylines: number[][];
  setPolylines: React.Dispatch<React.SetStateAction<number[][]>>;
  selectedAlgorithm: "brute-force" | "nearest-neighbor";
}

const MapComponent: React.FC<MapComponentProps> = ({ markers, setMarkers, polylines, selectedAlgorithm }) => {
  const MapClickHandler: React.FC = () => {
  useMapEvents({
    click:  (e) => {
      const { lat, lng } = e.latlng;

      if (selectedAlgorithm === "brute-force" && markers.length >= 11) {
        alert("Maximum 11 markers allowed for brute force algorithm.");
        return;
      }

      setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);
      //console.log('Current markers:', markers);
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
            {index === 0 ? "Start Node" : `[${marker.lat.toFixed(5)}, ${marker.lng.toFixed(5)}]`}
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

