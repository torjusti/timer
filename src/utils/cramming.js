import alg from 'alg';

// Used to map a move to a number from 0 to 5.
const moveMap = 'FRUBLD';

// Translate algorithms by a rotation.
const rotations = {
    x: 'DRFULB',
    y: 'RBULFD',
    z: 'FULBDR',
};

/**
 * Recursively remove all rotations from an algorithm
 ' while preserving the overall effect of the algorithm.
 */
const stripRotations = (algorithm) => {
  let moves = Array.isArray(algorithm) ? algorithm : alg.cube.fromString(algorithm);
  let move = moves.pop();
  let stack = [];

  while (move && !rotations[move.base]) {
    stack.unshift(move);
    move = moves.pop();
  }

  if (!move) {
    return alg.cube.toString(stack);
  }

  stack = stack.map((obj) => ({
    ...obj,
    base: rotations[move.base][moveMap.indexOf(obj.base)],
  }));

  return stripRotations(moves.concat(stack));
};
