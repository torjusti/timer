import { factorial } from './Tools';
import MoveTable from './MoveTable';
import PruningTable from './PruningTable';
import { parseScramble, formatMoveSequence } from './Scrambles';

import {
  getEdgeOrientationFromIndex,
  getCornerOrientationFromIndex,
  getIndexFromPermutation,
  edgeOrientationMove,
  edgePermutationMove,
  cornerOrientationMove,
  cornerPermutationMove,
} from './Coordinates';

class Search {
  constructor(affectedEdgeOrientationPieces, affectedEdgePermutationPieces, affectedCornerOrientationPieces, affectedCornerPermutationPieces) {
    this.affectedEdgeOrientationPieces = affectedEdgeOrientationPieces;
    this.affectedEdgePermutationPieces = affectedEdgePermutationPieces;

    this.affectedCornerOrientationPieces = affectedCornerOrientationPieces;
    this.affectedCornerPermutationPieces = affectedCornerPermutationPieces;

    if (affectedEdgePermutationPieces) {
      this.NUM_EDGE_PERMUTATIONS = factorial(12) / factorial(12 - this.affectedEdgePermutationPieces.length);
      this.DEFAULT_EDGE_PERMUTATION = getIndexFromPermutation([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.affectedEdgePermutationPieces);
    }

    if (affectedCornerPermutationPieces) {
      this.NUM_CORNER_PERMUTATIONS = factorial(8) / factorial(8 - this.affectedCornerPermutationPieces.length);
      this.DEFAULT_CORNER_PERMUTATION = getIndexFromPermutation([0, 1, 2, 3, 4, 5, 6, 7], this.affectedCornerPermutationPieces);
    }
  }

  populateCorrectEdgeOrientations() {
    this.correctEdgeOrientations = new Set();

    for (let i = 0; i < 2048; i++) {
      const orientation = getEdgeOrientationFromIndex(i);

      if (this.affectedEdgeOrientationPieces.every(piece => orientation[piece] === 0)) {
        this.correctEdgeOrientations.add(i);
      }
    }
  }

  populateCorrectCornerOrientations() {
    this.correctCornerOrientations = new Set();

    for (let i = 0; i < 2187; i++) {
      const orientation = getCornerOrientationFromIndex(i);

      if (this.affectedCornerOrientationPieces.every(piece => orientation[piece] === 0)) {
        this.correctCornerOrientations.add(i);
      }
    }
  }

  initialize() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    if (this.affectedEdgeOrientationPieces) {
      this.edgeOrientationMoves = new MoveTable(2048, edgeOrientationMove);
    }

    if (this.affectedEdgePermutationPieces) {
      this.edgePermutationMoves = new MoveTable(this.NUM_EDGE_PERMUTATIONS, (index, move) => edgePermutationMove(index, move, this.affectedEdgePermutationPieces));
    }

    if (this.affectedCornerOrientationPieces) {
      this.cornerOrientationMoves = new MoveTable(2187, cornerOrientationMove);
    }

    if (this.affectedCornerPermutationPieces) {
      this.cornerPermutationMoves = new MoveTable(this.NUM_CORNER_PERMUTATIONS, (index, move) => cornerPermutationMove(index, move, this.affectedCornerPermutationPieces));
    }

    if (this.affectedEdgeOrientationPieces) {
      this.populateCorrectEdgeOrientations();
    }

    if (this.affectedCornerOrientationPieces) {
      this.populateCorrectCornerOrientations();
    }

    if (this.edgeOrientationMoves) {
      this.pruneEdgeOrientation = new PruningTable(2048, this.edgeOrientationMoves, this.correctEdgeOrientations);
    }

    if (this.edgePermutationMoves) {
      this.pruneEdgePermutation = new PruningTable(this.NUM_EDGE_PERMUTATIONS, this.edgePermutationMoves, new Set().add(this.DEFAULT_EDGE_PERMUTATION));
    }

    if (this.cornerOrientationMoves) {
      this.pruneCornerOrientation = new PruningTable(2187, this.cornerOrientationMoves, this.correctCornerOrientations);
    }

    if (this.cornerPermutationMoves) {
      this.pruneCornerPermutation = new PruningTable(this.NUM_CORNER_PERMUTATIONS, this.cornerPermutationMoves, new Set().add(this.DEFAULT_CORNER_PERMUTATION));
    }
  }

  search(edgeOrientation, edgePermutation, cornerOrientation, cornerPermutation, depth, lastMove, solution) {
    if (depth === 0) {
      if (this.affectedEdgePermutationPieces && edgePermutation !== this.DEFAULT_EDGE_PERMUTATION) {
        return false;
      }

      if (this.affectedEdgeOrientationPieces && !this.correctEdgeOrientations.has(edgeOrientation)) {
        return false;
      }

      if (this.affectedCornerPermutationPieces && cornerPermutation !== this.DEFAULT_CORNER_PERMUTATION) {
        return false;
      }

      if (this.affectedCornerOrientationPieces && !this.correctCornerOrientations.has(cornerOrientation)) {
        return false;
      }

      return true;
    }

    if ((this.pruneEdgeOrientation && this.pruneEdgeOrientation.getPruningValue(edgeOrientation) > depth)
        || (this.pruneEdgePermutation && this.pruneEdgePermutation.getPruningValue(edgePermutation) > depth)
        || (this.pruneCornerOrientation && this.pruneCornerOrientation.getPruningValue(cornerOrientation) > depth)
        || (this.pruneCornerPermutation && this.pruneCornerPermutation.getPruningValue(cornerPermutation) > depth)) {
      return false;
    }

    for (let move = 0; move < 6; move++) {
      if (move !== lastMove && move !== lastMove - 3) {
        for (let pow = 0; pow < 3; pow++) {
          let innerEdgeOrientation = this.edgeOrientationMoves.doMove(edgeOrientation, move * 3 + pow);
          let innerEdgePermutation = this.edgePermutationMoves.doMove(edgePermutation, move * 3 + pow);

          // If any of the tables do not exist, we just pick 0 as a value - this does not matter,
          // because if the tables are empty, the index will not be checked against at all.
          let innerCornerOrientation = 0, innerCornerPermutation = 0;

          if (this.cornerOrientationMoves) {
            innerCornerOrientation = this.cornerOrientationMoves.doMove(cornerOrientation, move * 3 + pow);
          }

          if (this.cornerPermutationMoves) {
            innerCornerPermutation = this.cornerPermutationMoves.doMove(cornerPermutation, move * 3 + pow);
          }

          const result = this.search(innerEdgeOrientation, innerEdgePermutation, innerCornerOrientation, innerCornerPermutation, depth - 1, move, solution);

          if (result) {
            solution.push(move * 3 + pow);
            return true;
          }
        }
      }
    }

    return false;
  }

  solve(scramble) {
    this.initialize();

    const moves = parseScramble(scramble);

    let edgeOrientation = 0;
    let edgePermutation = this.DEFAULT_EDGE_PERMUTATION;

    let cornerOrientation = 0;
    let cornerPermutation = this.DEFAULT_CORNER_PERMUTATION;

    moves.forEach(move => {
      edgeOrientation = this.edgeOrientationMoves.doMove(edgeOrientation, move);
      edgePermutation = this.edgePermutationMoves.doMove(edgePermutation, move);

      if (this.cornerOrientationMoves) {
        cornerOrientation = this.cornerOrientationMoves.doMove(cornerOrientation, move);
      }

      if (this.cornerPermutationMoves) {
        cornerPermutation = this.cornerPermutationMoves.doMove(cornerPermutation, move);
      }
    });

    const solution = [];

    // Every cube is solvable with a depth of 20. However, such depths are too slow to ever end up solved.
    for (let depth = 0; depth < 20; depth++) {
      if (this.search(edgeOrientation, edgePermutation, cornerOrientation, cornerPermutation, depth, -1, solution)) {
        break;
      }
    }

    solution.reverse();

    return formatMoveSequence(solution);
  }
}

export default Search;
