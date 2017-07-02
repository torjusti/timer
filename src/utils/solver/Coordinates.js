import {
  edgeOrientationMove as doEdgeOrientationMove,
  edgePermutationMove as doEdgePermutationMove,
  cornerOrientationMove as doCornerOrientationMove,
  cornerPermutationMove as doCornerPermutationMove,
} from './Cube';

// Computes an unique index in the range from 0 to but not up to
// the maximum number of unique flips of the pieces.
// Thus, this function is a bijection, however there is no guaranteed logical
// connection between the indexes and the orientation.
const getIndexFromOrientation = (pieces, flipCount) => {
  let sum = 0;

  for (let i = 0; i < pieces.length - 1; i++) {
    sum = flipCount * sum + pieces[i];
  }

  return sum;
};

// Corners can be twisted in 3 ways.
export const getIndexFromCornerOrientation = (corners) => getIndexFromOrientation(corners, 3);

// Edges may be flipped or not.
export const getIndexFromEdgeOrientation = (edges) => getIndexFromOrientation(edges, 2);

const getOrientationFromIndex = (index, numPieces, numFlips) => {
  const orientation = [];

  let parity = 0;

  for (let i = numPieces - 2; i >= 0; i--) {
    const ori = index % numFlips;
    orientation[i] = ori;
    parity += ori;
    index = ~~(index / numFlips);
  }

  orientation[numPieces - 1] = (numFlips - parity % numFlips) % numFlips;

  return orientation;
};

export const getCornerOrientationFromIndex = (index) => getOrientationFromIndex(index, 8, 3);

export const getEdgeOrientationFromIndex = (index) => getOrientationFromIndex(index, 12, 2);

// Retrieves the unique permutation of the affected pieces in a list of given length corresponding to the given index.
const getPermutationFromIndex = (index, affectedPieces, size) => {
  const permutation = new Array(size);

  // Invalidate all pieces.
  for (let i = 0; i < size; i++) {
    permutation[i] = -1;
  }

  const indexes = new Array(affectedPieces.length);

  const factor = 1 + size - affectedPieces.length;

  let base = size;

  for (let i = 0; i < affectedPieces.length - 1; i++) {
    base *= factor + i;
  }

  for (let i = 0; i < affectedPieces.length - 1; i++) {
    base /= factor + i;
    const value = ~~(index / base);
    index = index % base;
    indexes[i] = value;
  }

  indexes[indexes.length - 1] = index;

  for (let i = 0; i < indexes.length; i++) {
    for (let j = i + 1; j < indexes.length; j++) {
      if (indexes[i] >= indexes[j]) {
        indexes[i] += 1;
      }
    }

    permutation[indexes[i]] = affectedPieces[i];
  }

  return permutation;
};

export const getEdgePermutationFromIndex = (index, affectedPieces) => getPermutationFromIndex(index, affectedPieces, 12);

export const getCornerPermutationFromIndex = (index, affectedPieces) => getPermutationFromIndex(index, affectedPieces, 8);

// This function is a bijection which will map the given permutation to an unique number.
// The range of the numbers depends on the affected pieces - the number will be an unique
// number in the range from 0 up but not unto the number of ways the affected pieces
// may be permuted in a list of the given length. The function is identical for both edges and corners.
export const getIndexFromPermutation = (permutation, affectedPieces) => {
  const indexes = [];

  for (let i = 0; i < affectedPieces.length; i++) {
    for (let j = 0; j < permutation.length; j++) {
      if (permutation[j] === affectedPieces[i]) {
        indexes[i] = j;
        break;
      }
    }
  }

  let base = permutation.length;

  let index = indexes[indexes.length - 1];

  for (let i = indexes.length - 2; i >= 0; i--) {
    for (let j = indexes.length - 1; j > i; j--) {
      if (indexes[i] > indexes[j]) {
        indexes[i] -= 1;
      }
    }

    index += base * indexes[i];

    base *= 1 + permutation.length - indexes.length + i;
  }

  return index;
};

// Returns the new orientation index after performing a move.
export const edgeOrientationMove = (index, move) => {
  let orientation = getEdgeOrientationFromIndex(index);
  orientation = doEdgeOrientationMove(orientation, move);
  return getIndexFromEdgeOrientation(orientation);
};

// Returns the new permutation index after performing a move.
export const edgePermutationMove = (index, move, affectedPieces) => {
  let permutation = getEdgePermutationFromIndex(index, affectedPieces);
  permutation = doEdgePermutationMove(permutation, move);
  return getIndexFromPermutation(permutation, affectedPieces);
};

export const cornerOrientationMove = (index, move) => {
  let orientation = getCornerOrientationFromIndex(index);
  orientation = doCornerOrientationMove(orientation, move);
  return getIndexFromCornerOrientation(orientation);
};

// Returns the new permutation index after performing a move.
export const cornerPermutationMove = (index, move, affectedPieces) => {
  let permutation = getCornerPermutationFromIndex(index, affectedPieces);
  permutation = doCornerPermutationMove(permutation, move);
  return getIndexFromPermutation(permutation, affectedPieces);
};
