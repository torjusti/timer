import { getEdgeOrientationFromIndex, getCornerOrientationFromIndex } from './Coordinates';

export const factorial = n => {
  let res = 1;

  for (let i = 2; i <= n; i++) {
    res *= i;
  }

  return res;
}

export const choose = (n, k) => {
  if (k === 0) {
    return 1;
  }

  return n * choose(n - 1, k - 1) / k;
};

// Cartesian product.
export const cartesian = arg => {
  const result = [], max = arg.length - 1;

  const helper = (arr, i) => {
    for (let j = 0; j < arg[i].length; j++) {
      const copy = arr.slice(0);

      copy.push(arg[i][j]);

      if (i === max) {
        result.push(copy);
      } else {
        helper(copy, i + 1);
      }
    }
  };

  helper([], 0);

  return result;
};

// Returns all indexes in the given space where all given
// pieces are oriented correctly.
export const getCorrectEdgeOrientations = (size, pieces) => {
  const indexes = [];

  for (let i = 0; i < size; i++) {
    const flips = getEdgeOrientationFromIndex(i);

    if (pieces.every(piece => flips[piece] === 0)) {
      indexes.push(i);
    }
  }

  return indexes;
};

// Returns all indexes in the given space where all given
// pieces are oriented correctly.
export const getCorrectCornerOrientations = (size, pieces) => {
  const indexes = [];

  for (let i = 0; i < size; i++) {
    const twists = getCornerOrientationFromIndex(i);

    if (pieces.every(piece => twists[piece] === 0)) {
      indexes.push(i);
    }
  }

  return indexes;
};
