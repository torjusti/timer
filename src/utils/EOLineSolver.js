/**
 * Maps the power part of a move to a number from 0 to 2.
 */
const powerMap = {
  '': 0,
  '2': 1,
  '\'': 2,
};

/**
 * Parses a scramble string into an array containing moves
 * represented using numbers from 0 to 5 for the move part
 * and a number from 0 to 2 for the power part.
 */
const parseScramble = (scramble) => scramble.split(/\s+/).map(move => [
  'FRUBLD'.indexOf(move.charAt(0)), powerMap[move.charAt(1)]
]);

/**
 *  Converts a parsed scramble back into a readable format.
 */
const formatMoveSequence = (sequence) => sequence.map(part => {
  const move = 'FRUBLD'.charAt(part[0]);
  const pow = ['', '2', '\''][part[1]];
  return move + pow;
}).join(' ');

/**
 * The edge pieces on the cube.
 */
const [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/**
 * Moves are represented by an array containing their effect on the
 * identity orientation and permutation vectors.
 */
const moves = [{
  ep: [UR, FL, UL, UB, DR, FR, DL, DB, UF, DF, BL, BR],
  eo: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
}, {
  ep: [FR, UF, UL, UB, BR, DF, DL, DB, DR, FL, BL, UR],
  eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}, {
  ep: [UB, UR, UF, UL, DR, DF, DL, DB, FR, FL, BL, BR],
  eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}, {
  ep: [UR, UF, UL, BR, DR, DF, DL, BL, FR, FL, UB, DB],
  eo: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
}, {
  ep: [UR, UF, BL, UB, DR, DF, FL, DB, FR, UL, DL, BR],
  eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}, {
  ep: [UR, UF, UL, UB, DF, DL, DB, DR, FR, FL, BL, BR],
  eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}];

/**
 * Multiplies two cubes together.
 */
const multiply = (position, other) => {
  const ep = [], eo = [];

  for (let i = 0; i < 12; i += 1) {
    const from = other.ep[i];
    ep[i] = position.ep[from];
    eo[i] = (position.eo[from] + other.eo[i]) % 2;
  }

  return { ep, eo };
};

/**
 * Performs a move on the given cube. Note that powerrs are not encoded
 * into the move - to perform such a move, the move must simply
 * be performed multiple times.
 */
const doMove = (cube, move) => multiply(cube, moves[move]);

/**
 * Returns the orientation vector given an orientation index.
 */
const getOrientationFromIndex = (index) => {
  let parity = 0, orientation = [];

  for (let i = 0; i <= 10; i += 1) {
    parity += orientation[i] = index % 2;
    index >>>= 1;
  }

  // The orientation of the last piece is uniquely determined by the parity.
  orientation[11] = parity;

  return orientation;
};

/**
 * Maps an orientation vector to a unique number.
 */
const getIndexFromOrientation = (orientation) => {
  let sum = 0;

  for (let i = 0; i <= 10; i += 1) {
    sum |= orientation[i] << i;
  }

  return sum;
};

/**
 *  Returns the permutation vector given a permutation index.
 */
const getPermutationFromIndex = (index) => {
  let permutation = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let a = index % 12;
  let b = Math.floor(index / 12);

  if (b >= a) {
    b += 1;
  }

  permutation[a] = 5;

  permutation[b] = 7;

  return permutation;
}

/**
 * Maps a permutation vector to a unique number.
 */
const getIndexFromPermutation = (permutation) => {
  let a = permutation.indexOf(5);
  let b = permutation.indexOf(7);

  if (b > a) {
    b -= 1;
  }

  return b * 12 + a;
};

/**
 * Creates a move table of a given size. The table is a 2-dimensional table,
 * where the first level indexes represents an index, and the values of the
 * index is the new index after a move has been applied to the index.
 */
const createMoveTable = (size, type) => {
  const table = [];

  for (let i = 0; i < size; i += 1) {
    table[i] = [];

    const cube = {
      eo: getOrientationFromIndex(i),
      ep: getPermutationFromIndex(i),
    };

    for (let move = 0; move < 6; move += 1) {
      if (type === 'orientation') {
        table[i][move] = getIndexFromOrientation(doMove(cube, move).eo);
      } else if (type === 'permutation') {
        table[i][move] = getIndexFromPermutation(doMove(cube, move).ep);
      }
    }
  }

  return table;
}

/**
 * Returns the stored pruning value in table for a given index.
 */
const getPruningValue = (table, index) => {
  const shift = (index % 8) << 2;
  return table[index >> 3] & (0xF << shift) >>> shift;
};

/**
 * Stores a value in the given pruning table.
 */
const setPruningValue = (table, index, value) => {
  const shift = (index % 8) << 2;
  table[index >> 3] = (table[index >> 3] & ~(0xF << shift)) | (value << shift);
};

/**
 * Compute a pruning table of the given size.
 */
const computePruningTable = (size, doMove, maxDepth) => {
  const table = [];

  for (let i = 0; i < Math.ceil(size / 8); i += 1) {
    table[i] = 0xF;
  }

  setPruningValue(table, 0, 0);

  for (let depth = 0; depth <= maxDepth; depth += 1) {
    for (let index = 0; index < size; index += 1) {
      if (getPruningValue(table, index) !== depth) {
        continue;
      }

      for (let move = 0; move < 6; move += 1) {
        let position = index;

        for  (let pow = 0; pow < 3; pow += 1) {
          position = doMove[position][move];

          if (getPruningValue(table, position) === 0xF) {
            setPruningValue(table, position, depth + 1);
          }
        }
      }
    }
  }

  return table;
};

let orientationMoves, permutationMoves, pruneOrientation, prunePermutation;

/**
 * Initialize the move tables and pruning tables.
 * There are 2^11=2048 possible orientations and (12!)/(12-2)!=132
 * permutations of the two line edges.
 */
let initialize = () => {
  orientationMoves = createMoveTable(2048, 'orientation');
  permutationMoves = createMoveTable(132, 'permutation');

  pruneOrientation = computePruningTable(2048, orientationMoves, 6);
  prunePermutation = computePruningTable(132, permutationMoves, 3);

  // Only initialize once.
  initialize = () => {};
};

/**
 * Depth first search.
 */
const search = (perm, flip, depth, lastMove, solution) => {
  if (depth === 0) {
    // The coordinates of the solved state.
    return perm === 77 && flip === 0;
  }

  if (getPruningValue(pruneOrientation, flip) > depth || getPruningValue(prunePermutation, perm) > depth) {
    return false;
  }

  for (let move = 0; move < 6; move += 1) {
    if (move !== lastMove && move !== lastMove - 3) {
      let innerPerm = perm;
      let innerFlip = flip;

      for (let pow  = 0; pow < 3; pow += 1) {
        innerPerm = permutationMoves[innerPerm][move];
        innerFlip = orientationMoves[innerFlip][move];

        const result = search(innerPerm,  innerFlip, depth - 1, move, solution);

        if (result) {
          solution.push([move, pow]);
          return true;
        }
      }
    }
  }
};

const EOLineSolver = (scramble) => {
  initialize();

  let moves = parseScramble(scramble);

  let flip = 0;
  let perm = 77;

	for (let i = 0; i < moves.length; i += 1) {
    const move = moves[i][0];
    const pow = moves[i][1];

    for (let j = 0; j <= pow; j++) {
			flip = orientationMoves[flip][move];
			perm = permutationMoves[perm][move];
		}
  }

  const solution = [];

  for (let depth = 0; depth < 9; depth += 1) {
    if (search(perm, flip, depth, -1, solution)) {
      break;
    }
  }

  return formatMoveSequence(solution.reverse());
};

export default EOLineSolver;
