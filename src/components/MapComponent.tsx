import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

interface MarkerData {
  lat: number;
  lng: number;
}

interface LineData {
  start: MarkerData;
  end: MarkerData;
}

// Create a custom DivIcon
const createCustomIcon = (): L.DivIcon =>
  L.divIcon({
    className: "custom-marker-icon",
    html: '<div style="font-size: 24px; color: white;">&#9679;</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

const ResizeMap: React.FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  const map = useMap();

  useEffect(() => {
    // Invalidate the map size when sidebarOpen changes
    setTimeout(() => {
      map.invalidateSize();
    }, 300); // Delay to match sidebar animation
  }, [sidebarOpen, map]);

  return null;
};

const MapComponent: React.FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [lines, setLines] = useState<LineData[]>([]);

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;

        setMarkers((prevMarkers) => {
          const newMarkers = [...prevMarkers, { lat, lng }];

          if (newMarkers.length > 1) {
            const prevMarker = newMarkers[newMarkers.length - 2];
            setLines((prevLines) => [...prevLines, { start: prevMarker, end: { lat, lng } }]);
          }

          return newMarkers;
        });
      },
    });
    return null;
  };

  const canvasRenderer = L.canvas();

  return (
    <MapContainer
      center={[49.872872197840614, 8.651154041290285]}
      zoom={6}
      scrollWheelZoom={true}
      className="leaflet-container"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        detectRetina={true}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
      />

      {/* Render markers */}
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]} icon={createCustomIcon()}>
          <Popup>
            Marker at [{marker.lat.toFixed(5)}, {marker.lng.toFixed(5)}]
          </Popup>
        </Marker>
      ))}

      {/* Render polylines with canvas renderer */}
      {lines.map((line, index) => (
        <Polyline
          key={index}
          pathOptions={{ color: "red" }}
          positions={[
            [line.start.lat, line.start.lng],
            [line.end.lat, line.end.lng],
          ]}
          renderer={canvasRenderer}
        />
      ))}

      <MapClickHandler />
      <ResizeMap sidebarOpen={sidebarOpen} />
    </MapContainer>
  );
};

export default MapComponent;

