import { useMapEvents } from "react-leaflet";
import { MarkerData } from "../types";

export const useMapClickHandler = (
  onClick: (lat: number, lng: number) => void
) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onClick(lat, lng);
    },
  });
};

