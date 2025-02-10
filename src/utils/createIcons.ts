import L from "leaflet";

export const createStartingNodeIcon = (): L.DivIcon =>
  L.divIcon({
    className: "custom-starting-node-icon",
    html: '<div style="font-size: 24px; color: lime;">&#9679;</div>',
    iconAnchor: [8, 20],
  });

export const createNormalNodeIcon = (): L.DivIcon =>
  L.divIcon({
    className: "custom-normal-node-icon",
    html: '<div style="font-size: 24px; color: white;">&#9679;</div>',
    iconAnchor: [8, 20],
  });

