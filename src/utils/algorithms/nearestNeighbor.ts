import { calculateDistance } from "../calculateDistance";

export const nearestNeighborTSP = (markers: { lat: number; lng: number }[]): number[][] => {
  if (markers.length < 2) return [];

  const unvisited = markers.map((_, index) => index);
  const path: number[] = [unvisited.shift()!]; // Start from the first node

  while (unvisited.length > 0) {
    let lastVisited = path[path.length - 1];
    let nearestIndex = -1;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const index = unvisited[i];
      const dist = calculateDistance(markers[lastVisited], markers[index]);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIndex = i;
      }
    }

    path.push(unvisited.splice(nearestIndex, 1)[0]); // Move nearest node to path
  }

  path.push(path[0]); // Return to the starting node

  return path.map((_, i) => [path[i], path[i + 1]]).slice(0, -1);
};

