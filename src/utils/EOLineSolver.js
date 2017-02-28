/* eslint-disable */

const EOLineSolver = scramble => {
  // Corners
  const [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];

  // Edges
  const [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Define moves.
  const moves =  [{
    ep: [UB, UR, UF, UL, DR, DF, DL, DB, FR, FL, BL, BR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }, {
    ep: [FR, UF, UL, UB, BR, DF, DL, DB, DR, FL, BL, UR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }, {
    ep: [UR, FL, UL, UB, DR, FR, DL, DB, UF, DF, BL, BR],
    eo: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
  }, {
    ep: [UR, UF, UL, UB, DF, DL, DB, DR, FR, FL, BL, BR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }, {
    ep: [UR, UF, BL, UB, DR, DF, FL, DB, FR, UL, DL, BR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }, {
    ep: [UR, UF, UL, BR, DR, DF, DL, BL, FR, FL, UB, DB],
    eo: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
  }];

  // Map faces to moves.
  const faceNums = {
    U: 0,
    R: 1,
    F: 2,
    D: 3,
    L: 4,
    B: 5,
  };

  const faceNames = {
    0: 'U',
    1: 'R',
    2: 'F',
    3: 'D',
    4: 'L',
    5: 'B',
  };

  // The solved cube.
  const identityCube = {
    ep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  // Multiply cubes with respect to edges.
  const multiply = (position, other) => {
    const ep = [];
    const eo = [];

    for (let i = 0; i < 12; i += 1) {
      const from = other.ep[i];
      ep[i] = position.ep[from];
      eo[i] = (position.eo[from] + other.eo[i]) % 2;
    }

    return Object.assign({}, position, { ep, eo });
  };

  const parseAlg = (alg) => {
    return Array.isArray(alg) ? alg :
      Number.isInteger(alg) ? [alg] :
      alg.split(/\s+/).map(part => faceNums[part[0]] * 3 +
      (part.length === 1 ? 0 : (part[1] == 2 ? 1 : 2)));
  };

  const result = (position, alg) => {
    if (alg.length === 0) {
      return position;
    }

    let cube = Object.assign({}, position);

    parseAlg(alg).forEach(move => {
      const face = move / 3 | 0;
      const power = move % 3;

      for (let i = 0; i <= power; i++) {
        cube = multiply(cube, moves[face]);
      }
    });

    return cube;
  };

  const formatSequence = sequence => sequence.map(num =>
    faceNames[num / 3 | 0] + ['', '2', '\''][num % 3]
  ).join(' ');

  const solved = ({ ep, eo }) => eo.every(o => o === 0) && ep[5] === 5 && ep[7] === 7;

  const StateRepresentation = ({ ep, eo }) => {
    let sum = 0;

    eo.forEach(edge => {
      sum = 2 * sum + edge;
    });

    sum = sum * 2 + ep[5];
    sum = sum * 2 + ep[7];

    return sum;
  };

  const TreeSearch = position => { 
    const queue = [];
    const identityQueue = [];

    const states = {};

    let best = Infinity;

    while (true) {
      const sequence = queue.shift() || [];
      const identitySequence = identityQueue.shift() || [];

      const sequenceResult = result(position, sequence);
      const identityResult = result(identityCube, identitySequence);

      if (solved(sequenceResult)) {
        return formatSequence(sequence);
      }

      if (!states[StateRepresentation(identityResult)]) {
        states[StateRepresentation(identityResult)] = identitySequence.length;
      }

      const stored = states[StateRepresentation(sequenceResult)];

      if (stored && stored < best) {
        best = stored;
      }

      if (isFinite(best) && (!stored || stored > best)) {
        continue;
      }

      for (let i = 0; i < 6; i++) {
        const last = (sequence.slice(-1)[0] / 3 | 0);

        if (sequence.length !== 0 && i === last) {
          continue;
        }

        if (last === i - 3 && i % 2 === 0) {
          continue;
        }

        for (let j = 0; j < 3; j++) {
          queue.push(sequence.concat([i * 3 + j]));
        }
      }

      if (!isFinite(best)) {
        for (let i = 0; i < 6; i++) {
          const last = (identitySequence.slice(-1)[0] / 3 | 0);

          if (identitySequence.length !== 0 && i === last) {
            continue;
          }

          if (last === i - 3 && i % 2 === 0) {
            continue;
          }

          for (let j = 0; j < 3; j++) {
            identityQueue.push(identitySequence.concat([i * 3 + j]));
          }
        }
      }
    }
  };

  return TreeSearch(result(identityCube, scramble));
};

export default EOLineSolver;
