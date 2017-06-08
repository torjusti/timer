import { getEdgeOrientationFromIndex } from './Coordinates';

export const factorial = n => {
  if (n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

// Returns all indexes in the given space where all given
// pieces are oriented correctly.
export const getCorrectOrientations = (size, pieces) => {
  const indexes = new Set();

  for (let i = 0; i < size; i++) {
    const flips = getEdgeOrientationFromIndex(i);

    if (pieces.every(piece => flips[piece] === 0)) {
      indexes.add(i);
    }
  }

  return indexes;
};
