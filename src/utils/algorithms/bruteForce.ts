import { calculateDistance } from '../calculateDistance';

export const bruteForceTSP = (markers: { lat: number; lng: number }[]): number[][] => {
  const indices = markers.map((_, index) => index);
  const path = [...indices.slice(1)];
  let minDistance = Infinity;
  let bestPath: number[] = [];

  const nextPermutation = (array: number[]): boolean => {
    let i = array.length - 2;
    while (i >= 0 && array[i] >= array[i + 1]) i--;
    if (i < 0) return false;

    let j = array.length - 1;
    while (array[j] <= array[i]) j--;

    [array[i], array[j]] = [array[j], array[i]];
    array.splice(i + 1, array.length - (i + 1), ...array.slice(i + 1).reverse());
    return true;
  };

  do {
    const route = [0, ...path, 0];
    let totalDistance = 0;

    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += calculateDistance(markers[route[i]], markers[route[i + 1]]);
    }

    if (totalDistance < minDistance) {
      minDistance = totalDistance;
      bestPath = [...route];
    }
  } while (nextPermutation(path));

  return bestPath.map((_, i) => [bestPath[i], bestPath[i + 1]]).slice(0, -1);
};
