export const calculateDistance = (a: { lat: number; lng: number }, b: { lat: number; lng: number }): number => {
  const latDiff = b.lat - a.lat;
  const lngDiff = b.lng - a.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
};

