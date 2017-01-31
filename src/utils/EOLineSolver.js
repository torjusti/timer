const EOLineSolver = scramble => {
  // Corners
  const [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];

  // Edges
  const [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Define moves.
  const moves =  [{
    cp: [UBR, URF, UFL, ULB, DFR, DLF, DBL, DRB],
    co: [0, 0, 0, 0, 0, 0, 0, 0],
    ep: [UB, UR, UF, UL, DR, DF, DL, DB, FR, FL, BL, BR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }, {
    cp: [DFR, UFL, ULB, URF, DRB, DLF, DBL, UBR],
    co: [2, 0, 0, 1, 1, 0, 0, 2],
    ep: [FR, UF, UL, UB, BR, DF, DL, DB, DR, FL, BL, UR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }, {
    cp: [UFL, DLF, ULB, UBR, URF, DFR, DBL, DRB],
    co: [1, 2, 0, 0, 2, 1, 0, 0],
    ep: [UR, FL, UL, UB, DR, FR, DL, DB, UF, DF, BL, BR],
    eo: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
  }, {
    cp: [URF, UFL, ULB, UBR, DLF, DBL, DRB, DFR],
    co: [0, 0, 0, 0, 0, 0, 0, 0],
    ep: [UR, UF, UL, UB, DF, DL, DB, DR, FR, FL, BL, BR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }, {
    cp: [URF, ULB, DBL, UBR, DFR, UFL, DLF, DRB],
    co: [0, 1, 2, 0, 0, 2, 1, 0],
    ep: [UR, UF, BL, UB, DR, DF, FL, DB, FR, UL, DL, BR],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }, {
    cp: [URF, UFL, UBR, DRB, DFR, DLF, ULB, DBL],
    co: [0, 0, 1, 2, 0, 0, 2, 1],
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
    cp: [0, 1, 2, 3, 4, 5, 6, 7],
    co: [0, 0, 0, 0, 0, 0, 0, 0],
    ep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  // Multiply cubes with respect to corners.
  const cornerMultiply = (position, other) => {
    const cp = [];
    const co = [];

    for (let i = 0; i < 8; i += 1) {
      const from = other.cp[i];
      cp[i] = position.cp[from];
      co[i] = (position.co[from] + other.co[i]) % 3;
    }

    return Object.assign({}, position, { cp, co });
  };

  // Multiply cubes with respect to edges.
  const edgeMultiply = (position, other) => {
    const ep = [];
    const eo = [];

    for (let i = 0; i < 12; i += 1) {
      const from = other.ep[i];
      ep[i] = position.ep[from];
      eo[i] = (position.eo[from] + other.eo[i]) % 2;
    }

    return Object.assign({}, position, { ep, eo });
  };

  const multiply = (position, other) => {
    // EOLine only requires multiplicatino with respect to edges.
    return edgeMultiply(position, other);
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

  const inverseFormatSequence = sequence => sequence.reverse().map(num =>
    faceNames[num / 3 | 0] + ['\'', '2', ''][num % 3]
  ).join(' ');

  const combineSequenceAndInverse = (seq, inv) => formatSequence(seq) + ' ' + inverseFormatSequence(inv);

  const solved = ({ cp, co, ep, eo }) => eo.every(o => o === 0) && ep[5] === 5 && ep[7] === 7;

  const StateRepresentation = ({ cp, co, ep, eo }) => {
    return [eo.toString(), ep[5], ep[7]].join();
  };

  let foundInPruningTable = false;

  let maxDepth = 0;

  const TreeSearch = position => { 
    const queue = [];
    const identityQueue = [];

    const states = {};

    while (true) {
      const sequence = queue.shift() || [];
      const identitySequence = identityQueue.shift() || [];

      let depth = identitySequence.length;
      maxDepth = Math.max(maxDepth, depth);

      const sequenceResult = result(position, sequence);
      const identityResult = result(identityCube, identitySequence);

      if (solved(sequenceResult)) {
        return formatSequence(sequence);
      }

      states[StateRepresentation(identityResult)] = states[StateRepresentation(identityResult)] || identitySequence;

      const storedSequence = states[StateRepresentation(sequenceResult)];

      if (storedSequence && [0] / 3 | 0 !== sequence.slice(-1)[0] / 3 | 0) {
        return combineSequenceAndInverse(sequence, storedSequence);
      }

      for (let i = 0; i < 6; i++) {
        const last = (sequence.slice(-1)[0] / 3 | 0);

        if (sequence.length !== 0 && i === last) {
          continue;
        }

        for (let j = 0; j < 3; j++) {
          queue.push(sequence.concat([i * 3 + j]));
        }
      }

      if (depth >= maxDepth) {
        for (let i = 0; i < 6; i++) {
          const last = (identitySequence.slice(-1)[0] / 3 | 0);

          if (identitySequence.length !== 0 && i === last) {
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
