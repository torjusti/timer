import { parseScramble, formatMoveSequence } from './Scrambles';
import MoveTable from './MoveTable';
import PruningTable from './PruningTable';
import { getIndexFromPermutation, edgePermutationMove, edgeOrientationMove, cornerOrientationMove, cornerPermutationMove } from './Coordinates';
import { factorial, getCorrectEdgeOrientations, getCorrectCornerOrientations } from './Tools';

class Search {
  constructor() {
    this.tables = [];
  }

  addTables(settings) {
    const solvedIndexes = settings.solvedIndexes || new Set().add(settings.defaultIndex);

    const moveTable = new MoveTable(settings.size, settings.doMove);
    const pruningTable = new PruningTable(settings.size, moveTable, solvedIndexes);

    this.tables.push({
      moveTable,
      defaultIndex: settings.defaultIndex,
      solvedIndexes,
      pruningTable,
    });
  }

  addSimpleEdgeOrientationTable(pieces) {
    const EO_SIZE = Math.pow(2, 11);

    this.addTables({
      size: EO_SIZE,
      doMove: edgeOrientationMove,
      defaultIndex: 0,
      solvedIndexes: pieces.length === 12 ? 0 : getCorrectEdgeOrientations(EO_SIZE, pieces),
    });
  }

  addSimpleCornerOrientationTable(pieces) {
    const CO_SIZE = Math.pow(3, 7);

    this.addTables({
      size: CO_SIZE,
      doMove: cornerOrientationMove,
      defaultIndex: 0,
      solvedIndexes: pieces.length === 8 ? 0 : getCorrectCornerOrientations(CO_SIZE, pieces),
    });
  }

  addSimpleEdgePermutationTable(pieces) {
    const size = factorial(12) / factorial(12 - pieces.length);
    const defaultIndex = getIndexFromPermutation([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], pieces);

    this.addTables({
      size,
      doMove: (index, move) => edgePermutationMove(index, move, pieces),
      defaultIndex,
    });
  }

  addSimpleCornerPermutationTable(pieces) {
    const size = factorial(8) / factorial(8 - pieces.length);
    const defaultIndex = getIndexFromPermutation([0, 1, 2, 3, 4, 5, 6, 7], pieces);

    this.addTables({
      size,
      doMove: (index, move) => cornerPermutationMove(index, move, pieces),
      defaultIndex,
    });
  }

  search(indexes, depth, lastMove, solution) {
    let maximumDistance = 0;

    for (let i = 0; i < indexes.length; i++) {
      const distance = this.tables[i].pruningTable.getPruningValue(indexes[i]);

      if (distance > depth) {
        return false;
      }

      if (distance > maximumDistance) {
        maximumDistance = distance;
      }
    }

    if (maximumDistance === 0) {
      return true;
    }

    for (let move = 0; move < 6; move++) {
      if (move !== lastMove && move !== lastMove - 3) {
        for (let pow = 0; pow < 3; pow++) {
          const updatedIndexes = [];

          for (let i = 0; i < indexes.length; i++) {
            updatedIndexes.push(this.tables[i].moveTable.doMove(indexes[i], move * 3 + pow));
          }

          const result = this.search(updatedIndexes, depth - 1, move, solution);

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
    if (!this.initialized) {
      this.initialize();
      this.initialized = true;
    }

    const moves = parseScramble(scramble);

    const indexes = [];

    for (let i = 0; i < this.tables.length; i++) {
      indexes.push(this.tables[i].defaultIndex);
    }

    moves.forEach(move => {
      for (let i = 0; i < indexes.length; i++) {
        indexes[i] = this.tables[i].moveTable.doMove(indexes[i], move);
      }
    });

    const solution = [];

    // Every cube is solvable with a depth of 20. However, such depths are too slow to ever end up solved.
    for (let depth = 0; depth < 20; depth++) {
      if (this.search(indexes, depth, -1, solution)) {
        break;
      }
    }

    solution.reverse();

    return formatMoveSequence(solution);
  }
}

export default Search;
