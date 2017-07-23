import {
  edgeOrientationMove as doEdgeOrientationMove,
  edgePermutationMove as doEdgePermutationMove,
  cornerOrientationMove as doCornerOrientationMove,
  cornerPermutationMove as doCornerPermutationMove,
} from './Cube';

import { choose } from './Tools';

/**
 * This function is a bijection which, when given a permutation
 * vector, will return an unique index from 0 and up to the
 * kaximum number of different orientations of the pieces.
 * However, there is no guaranteed logical conncetion between
 * the indexes and the orientation. The flip count is the
 * number of times an individual piece may be oriented.
 * For edges this number is 2 flips, and for corners there
 * are 3 possible twists.
 */
const getIndexFromOrientation = (pieces, flipCount) => {
  let sum = 0;

  // Note that we are not including the last piece in
  // the index. This is because the orientation of the
  // last piece is uniquely defined by the orientation
  // of the other pieces - an even number of pieces
  // must be twisted or flipped.
  for (let i = 0; i < pieces.length - 1; i++) {
    sum = flipCount * sum + pieces[i];
  }

  return sum;
};

/**
 * Returns an index describing the orientation of all edge pieces.
 */
export const getIndexFromEdgeOrientation = (edges) => getIndexFromOrientation(edges, 2);

/**
 * Returns an index describing the orientation of all corner pieces.
 */
export const getIndexFromCornerOrientation = (corners) => getIndexFromOrientation(corners, 3);

/**
 * Restores an orientation vector when given the index,
 * the number of pieces in the vector and number of ways
 * an individual piece may be oriented.
 */
const getOrientationFromIndex = (index, numPieces, numFlips) => {
  const orientation = [];

  let parity = 0;

  for (let i = numPieces - 2; i >= 0; i--) {
    const ori = index % numFlips;
    index = Math.floor(index / numFlips);
    orientation[i] = ori;
    parity += ori;
  }

  // The orientation of the last piece is uniquely
  // determined by the orienttion of the other pieces.
  orientation[numPieces - 1] = (numFlips - parity % numFlips) % numFlips;

  return orientation;
};

/**
 * Returns the orientation of all edge pieces when given an index.
 */
export const getEdgeOrientationFromIndex = (index) => getOrientationFromIndex(index, 12, 2);

/**
 * Returns the orientation of all corner pieces when given an index.
 */
export const getCornerOrientationFromIndex = (index) => getOrientationFromIndex(index, 8, 3);

/**
 * Retrieves the unique permuation determined by the given index,
 * affected pieces and vector length.
 */
const getPermutationFromIndex = (index, affectedPieces, size) => {
  const permutation = [];

  // Invalidate all pieces.
  for (let i = 0; i < size; i++) {
    permutation[i] = -1;
  }

  const indexes = [];

  const factor = 1 + size - affectedPieces.length;

  let base = size;

  for (let i = 0; i < affectedPieces.length - 1; i++) {
    base *= factor + i;
  }

  for (let i = 0; i < affectedPieces.length; i++) {
    base /= factor + i;
    indexes[i] = Math.floor(index / base);
    index = index % base;
  }

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

/**
 * Returns the edge permutation vector for the given affected piecs and index.
 */
export const getEdgePermutationFromIndex = (index, affectedPieces) => getPermutationFromIndex(index, affectedPieces, 12);

/**
 * Returns the corner permutation vector for the given affected pieces and index.
 */
export const getCornerPermutationFromIndex = (index, affectedPieces) => getPermutationFromIndex(index, affectedPieces, 8);

/**
 * In phase two of the Kociemba algorithm, the permutation of the edges
 * on the equator slice are solved separately. This function returns
 * a smaller permutation vector of length 8 describing the permutation
 * of the edge not in the equator slice during phase two.
 */
export const getIndexFromPhaseTwoPermutation = (permutation) => getIndexFromPermutation(permutation.slice(0, 8), [0, 1, 2, 3, 4, 5]);

/**
 * Returns a smaller permutation vector of length 8 describing the
 * permutation of the equator slice edges during phase two.
 */
export const getIndexFromPhaseTwoSlicePermutation = (permutation) => getIndexFromPermutation(permutation.slice(8, 12), [8, 9, 10, 11]);

/**
 * Bijection which maps a given permutation to an unique number. The range
 * of the numbers depends on the size of the affected pieces - the number will
 * be an unique number in the range from 0 and up to the number of ways the
 * affected pieces may be permuted in a list of the given length. The function
 * is identical for both edge pieces and corner pieces.
 */
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

/**
 * Returns an index describing which pieces in an array are occupied.
 * The function assumes an array of ones and ones, where an one indicates
 * that the position, and a zero indicates it is not. This function is
 * used in phase one of the Kciemba algorithm, to search for a position
 * where all the equator slice pieces are in the equator slice, but not
 * necessarily permuted correctly.
 */
export const getIndexFromPosition = (occupied) => {
  let sum = 0, k = occupied.filter(piece => piece === 1).length - 1, n = occupied.length - 1;

  while (k >= 0) {
    if (occupied[n]) {
      k -= 1;
    } else {
      sum += choose(n, k);
    }

    n -= 1;
  }

  return sum;
};

/**
 * Returns a vector describing which pieces in an array are occupied.
 */
export const getPositionFromIndex = (coord, pieces, size) => {
  let sum = 0, k = pieces - 1, n = size - 1, permutation = [];

  for (let i = 0; i < size; i++) {
    permutation.push(0);
  }

  while (k >= 0) {
    let cur = sum + choose(n, k);

    if (coord - cur >= 0) {
      sum = cur;
    } else {
      k -= 1;
      permutation[n] = 1;
    }

    n -= 1;
  }

  return permutation;
};

export const getParity = (pieces) => {
  let sum = 0;

  for (let i = pieces.length - 1; i > 0; i -= 1) {
    for (let j = i - 1; j >= 0; j -= 1) {
      if (pieces[j] > pieces[i]) {
        sum += 1;
      }
    }
  }

  return sum % 2;
};

/**
 * Returns an index describing the position of the given edge pieces.
 */
export const getEdgePositionFromIndex = (coord, pieces) => getPositionFromIndex(coord, pieces, 12);

/**
 * Returns an index describing the position of the given corner pieces.
 */
export const getCornerPositionFromIndex = (coord, pieces) => getPositionFromIndex(coord, pieces, 8);

export const edgeOrientationMove = (index, move) => {
  let orientation = getEdgeOrientationFromIndex(index);
  orientation = doEdgeOrientationMove(orientation, move);
  return getIndexFromEdgeOrientation(orientation);
};

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

export const cornerPermutationMove = (index, move, affectedPieces) => {
  let permutation = getCornerPermutationFromIndex(index, affectedPieces);
  permutation = doCornerPermutationMove(permutation, move);
  return getIndexFromPermutation(permutation, affectedPieces);
};

export const edgePositionMove = (index, move, pieces) => {
  let permutation = getEdgePositionFromIndex(index, pieces);
  permutation = doEdgePermutationMove(permutation, move);
  return getIndexFromPosition(permutation, pieces);
};

export const cornerPositionMove = (index, move, pieces) => {
  let permutation = getCornerPositionFromIndex(index, pieces);
  permutation = doCornerPermutationMove(permutation, move);
  return getIndexFromPosition(permutation);
};

export const phaseTwoPermutationMove = (index, move) => {
  let permutation = getPermutationFromIndex(index, [0, 1, 2, 3, 4, 5], 8).concat([8, 9, 10, 11]);
  permutation = doEdgePermutationMove(permutation, move);
  return getIndexFromPhaseTwoPermutation(permutation);
};

export const phaseTwoSlicePermutationMove = (index, move) => {
  let permutation = [0, 1, 2, 3, 4, 5, 6, 7].concat(getPermutationFromIndex(index, [8, 9, 10, 11], 4));
  permutation = doEdgePermutationMove(permutation, move);
  return getIndexFromPhaseTwoSlicePermutation(permutation);
};
