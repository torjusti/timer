// We define the edge moves by which 4 edges they cycle in a clockwise fashion.
// Thus, we store moves as a 2D list describing which pieces the move cycles clockwise.
// Pieces: UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR.
const edgeMoves =  [
  [1, 8, 5, 9], // F
  [0, 11, 4, 8], // R
  [1, 2, 3, 0], // U
  [3, 10, 7, 11], // B
  [2, 9, 6, 10], // L
  [5, 4, 7, 6], // D
];

// Corner moves are stored as the resulting vector after a move is applied
// to the identity cube.
// Pieces: URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB.
const cornerPermutationMoves = [
  [1, 5, 2, 3, 0, 4, 6, 7], // F
  [4, 1, 2, 0, 7, 5, 6, 3], // R
  [3, 0, 1, 2, 4, 5, 6, 7], // U
  [0, 1, 3, 7, 4, 5, 2, 6], // B
  [0, 2, 6, 3, 4, 1, 5, 7], // L
  [0, 1, 2, 3, 5, 6, 7, 4], // D
];

// Corner orientation moves are stored in the same way as permutation moves.
const cornerOrientationMoves = [
  [1, 2, 0, 0, 2, 1, 0, 0], // F
  [2, 0, 0, 1, 1, 0, 0, 2], // R
  [0, 0, 0, 0, 0, 0, 0, 0], // U
  [0, 0, 1, 2, 0, 0, 2, 1], // B
  [0, 1, 2, 0, 0, 2, 1, 0], // L
  [0, 0, 0, 0, 0, 0, 0, 0], // D
];

// Shuffles the items in a list to the right by one.
// This helps us compute the result cube after a move is applied, as
// all moves permute pieces to the right by one in a circular fashion.
const rotateRight = (edges, elems) => {
  const updatedPieces = edges.slice(0);

  updatedPieces[elems[0]] = edges[elems[elems.length - 1]];

  for (let i = 1; i < elems.length; i++) {
    updatedPieces[elems[i]] = edges[elems[i - 1]];
  }

  return updatedPieces;
};

// Permutes an edge piece vector.
export const edgePermutationMove = (pieces, moveIndex) => {
  const move = edgeMoves[~~(moveIndex / 3)];
  const pow = moveIndex % 3;

  for (let i = 0; i <= pow; i++) {
    pieces = rotateRight(pieces, move);
  }

  return pieces;
};

// Orients the pieces in an edge orientation vector.
export const edgeOrientationMove = (pieces, moveIndex) => {
  const moveNumber = ~~(moveIndex / 3);
  const move = edgeMoves[moveNumber];
  const pow = moveIndex % 3;

  let updatedPieces = edgePermutationMove(pieces, moveIndex);

  // F and B moves affect the orientation, but only if it is only a single slice move in either direction.
  if ((moveNumber === 0 || moveNumber === 3) && pow % 2 === 0) {
    updatedPieces[move[0]] = (updatedPieces[move[0]] + 1) % 2;
    updatedPieces[move[1]] = (updatedPieces[move[1]] + 1) % 2;
    updatedPieces[move[2]] = (updatedPieces[move[2]] + 1) % 2;
    updatedPieces[move[3]] = (updatedPieces[move[3]] + 1) % 2;
  }

  return updatedPieces;
};

// Permutes the elements in a corner permutation vector.
export const cornerPermutationMove = (pieces, moveIndex) => {
  const move = cornerPermutationMoves[~~(moveIndex / 3)];
  const pow = moveIndex % 3;

  for (let i = 0; i <= pow; i++) {
    const round = pieces.slice(0);

    for (let j = 0; j < 8; j++) {
      pieces[j] = round[move[j]];
    }
  }

  return pieces;
};

// Orients the elements in a corner orientation vector.
export const cornerOrientationMove = (pieces, moveIndex) => {
  const move = ~~(moveIndex / 3);
  const pow = moveIndex % 3;

  for (let i = 0; i <= pow; i++) {
    const round = pieces.slice(0);

    for (let j = 0; j < 8; j++) {
      const from = cornerPermutationMoves[move][j];
      pieces[j] = (round[from] + cornerOrientationMoves[move][j]) % 3;
    }
  }

  return pieces;
};
