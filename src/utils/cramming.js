import alg from 'alg';

// Used to map a move to a number from 0 to 5.
const moveMap = 'FRUBLD';

// Translate algorithms by a rotation.
const rotations = {
    x: 'DRFULB',
    y: 'RBULFD',
    z: 'FULBDR',
};

// Wide moves written as a move and a rotation.
let wideMoves = {
  'f': 'z B',
  'r': 'x L',
  'u': 'y D',
  'b': "z' F",
  'l': "x' R",
  'd': "y' U",
};

// Translate wide moves into objects as used internally by alg.js.
Object.keys(wideMoves).forEach((move) => {
  wideMoves[move] = alg.cube.fromString(wideMoves[move]);
});

/**
 * Recursively remove all rotations from an algorithm
 * while preserving the overall effect of the algorithm.
 * Also translates wide moves.
 */
const stripRotations = (algorithm) => {
  let moves = Array.isArray(algorithm) ? algorithm :
    alg.cube.fromString(alg.cube.expand(algorithm));

  // Translate all wide moves to moves and a rotation.
  moves = moves.reduce((acc, move) => {
    let updated = [];

    if (wideMoves[move.base]) {
      const amount = move.amount > 0 ? move.amount : 3;

      for (let i = 0; i < amount; i += 1) {
        updated = updated.concat(wideMoves[move.base]);
      }
    } else {
      updated.push(move);
    }

    return acc.concat(updated);
  }, []);

  let move = moves.pop();

  let translated = [];

  while (move && !rotations[move.base]) {
    translated.unshift(move);
    move = moves.pop();
  }

  if (!move) {
    return alg.cube.toString(translated);
  }

  for (let i = 0; i < move.amount; i += 1) {
    translated = translated.map((obj) => ({
      ...obj,
      base: rotations[move.base][moveMap.indexOf(obj.base)],
    }));
  }

  // Simplifying will remove duplicate moves which are
  // caused by the wide move translation.
  return alg.cube.simplify(stripRotations(moves.concat(translated)));
};
