import Search from './Search';
import MoveTable from './MoveTable';
import { edgePermutationMove, cornerPermutationMove } from './Cube';
import { combineSequences, formatMoveSequence, parseScramble } from './Scrambles';

import {
  getIndexFromPosition,
  edgePositionMove,
  phaseTwoPermutationMove,
  getIndexFromPhaseTwoPermutation,
  getIndexFromPhaseTwoSlicePermutation,
  phaseTwoSlicePermutationMove,
  getIndexFromPermutation
} from './Coordinates';

class PhaseOneSolver extends Search {
  initialize() {
    const Slice = this.addMoveTable({
      size: 495, // 12 choose 4
      doMove: (index, move) => edgePositionMove(index, move, 4),
      defaultIndex: getIndexFromPosition([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]),
    }, true);

    const CornerOrientation = this.addSimpleCornerOrientationTable([0, 1, 2, 3, 4, 5, 6, 7], true);
    const EdgeOrientation = this.addSimpleEdgeOrientationTable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], true);

    this.addPruningTable([Slice, CornerOrientation]);
    this.addPruningTable([Slice, EdgeOrientation]);

    this.phaseOne = true;
  }
}

class PhaseTwoSolver extends Search {
  getIndexes(moves) {
    let ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let cp = [0, 1, 2, 3, 4, 5, 6, 7];

    moves.forEach(move => {
      ep = edgePermutationMove(ep, move);
      cp = cornerPermutationMove(cp, move);
    });

    return [
      getIndexFromPhaseTwoPermutation(ep),
      getIndexFromPhaseTwoSlicePermutation(ep),
      getIndexFromPermutation(cp, [0, 1, 2, 3, 4, 5, 6, 7]),
    ];
  }

  initialize() {
    this.moves = [1, 10, 4, 13, 6, 7, 8, 15, 16, 17];

    const EdgePermutation = this.addMoveTable({
      size: 40320,
      doMove: (index, move) => phaseTwoPermutationMove(index, move),
      defaultIndex: getIndexFromPhaseTwoPermutation([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    }, true);

    const SlicePermutation = this.addMoveTable({
      size: 24,
      doMove: (index, move) => phaseTwoSlicePermutationMove(index, move),
      defaultIndex: getIndexFromPhaseTwoSlicePermutation([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    }, true);

    const CornerPermutation = this.addSimpleCornerPermutationTable([0, 1, 2, 3, 4, 5, 6, 7], true);

    this.addPruningTable([SlicePermutation, EdgePermutation]);

    this.addPruningTable([SlicePermutation, CornerPermutation])
  }
}

const phaseOneSolver = new PhaseOneSolver();

const phaseTwoSolver = new PhaseTwoSolver();

const solver = scramble => {
  let maxDepth = 30, parsedScramble = parseScramble(scramble), solution;

  outer: for (let depth = 0; depth < maxDepth; depth++) {
    let phaseOneSolutions = phaseOneSolver.solve(scramble, depth, depth, false);

    for (let phaseOne of phaseOneSolutions) {
      if (phaseOne.length >= maxDepth) {
        break outer;
      }

      let lastMove = phaseOne.slice(-1)[0];

      let phaseTwo = phaseTwoSolver.solve(
        parsedScramble.concat(phaseOne),
        0, maxDepth - phaseOne.length,
        false, lastMove,
      ).next().value;

      if (phaseTwo) {
        solution = phaseOne.concat(phaseTwo);

        if (solution.length < maxDepth) {
          maxDepth = solution.length - 1;
        }
      }
    }
  }

  console.log('Kociemba:', formatMoveSequence(solution));
  return formatMoveSequence(solution);
}

export default solver;
