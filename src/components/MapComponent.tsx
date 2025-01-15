import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";

interface MarkerData {
  lat: number;
  lng: number;
}

const createStartingNodeIcon = (): L.DivIcon =>
  L.divIcon({
    className: "custom-starting-node-icon",
    html: '<div style="font-size: 24px; color: lime;">&#9679;</div>',
    iconAnchor: [8, 20],
  });

const createNormalNodeIcon = (): L.DivIcon =>
  L.divIcon({
    className: "custom-normal-node-icon",
    html: '<div style="font-size: 24px; color: white;">&#9679;</div>',
    iconAnchor: [8, 20],
  });

const calculateDistance = (a: MarkerData, b: MarkerData): number => {
  // Pythagorean distance: using lat and lng differences as straight-line
  const latDiff = b.lat - a.lat;
  const lngDiff = b.lng - a.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
};

const permute = (array: number[]): number[][] => {
  if (array.length <= 1) return [array];
  const result: number[][] = [];
  for (let i = 0; i < array.length; i++) {
    const rest = permute(array.slice(0, i).concat(array.slice(i + 1)));
    for (const perm of rest) {
      result.push([array[i], ...perm]);
    }
  }
  return result;
};

const bruteForceTSP = (markers: MarkerData[]): number[][] => {
  if (markers.length < 2) return [];
  const indices = markers.map((_, index) => index);
  const permutations = permute(indices.slice(1));
  let minDistance = Infinity;
  let bestPath: number[] = [];

  for (const perm of permutations) {
    const path = [0, ...perm, 0];
    let totalDistance = 0;

    for (let i = 0; i < path.length - 1; i++) {
      totalDistance += calculateDistance(
        markers[path[i]],
        markers[path[i + 1]]
      );
    }

    if (totalDistance < minDistance) {
      minDistance = totalDistance;
      bestPath = path;
    }
  }

  return bestPath.map((_, i) => [bestPath[i], bestPath[i + 1]]).slice(0, -1);
};

const MapComponent: React.FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [polylines, setPolylines] = useState<number[][]>([]);

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);
      },
    });
    return null;
  };

  const runTSP = () => {
    if (markers.length > 1) {
      const path = bruteForceTSP(markers);
      setPolylines(path);
    } else {
      alert("Add at least 2 markers to run TSP.");
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
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
            icon={
              index === 0 ? createStartingNodeIcon() : createNormalNodeIcon()
            }
          >
            <Popup>
              {index === 0
                ? "Start Node"
                : `Marker at [${marker.lat.toFixed(5)}, ${marker.lng.toFixed(5)}]`}
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

      <button
        onClick={runTSP}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "lime",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Run
      </button>
    </div>
  );
};

export default MapComponent;

