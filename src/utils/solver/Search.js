import { parseScramble, formatMoveSequence } from './Scrambles';
import MoveTable from './MoveTable';
import PruningTable from './PruningTable';
import { getIndexFromPermutation, edgePermutationMove, edgeOrientationMove, cornerOrientationMove, cornerPermutationMove } from './Coordinates';
import { factorial, getCorrectEdgeOrientations, getCorrectCornerOrientations } from './Tools';

class Search {
  constructor() {
    this.moveTables = [];

    this.pruningTables = [];
  }

  addPruningTable(moveTableIndexes) {
    // We need the size of the tables to be sorted, as we encode indexes in different
    // bases when working with composite tables.
    moveTableIndexes.sort((a, b) => this.moveTables[a].getSize() - this.moveTables[b].getSize());

    const moveTables = [];

    moveTableIndexes.forEach(i => moveTables.push(this.moveTables[i]));

    const pruningTable = new PruningTable(moveTables);

    this.pruningTables.push({
      pruningTable,
      moveTableIndexes,
    });
  }

  addMoveTable(settings, noPruningTable) {
    const moveTable = new MoveTable(settings.size, settings.doMove, settings.defaultIndex, settings.solvedIndexes);

    this.moveTables.push(moveTable);

    if (noPruningTable) {
      return this.moveTables.length - 1;
    }

    this.addPruningTable([this.moveTables.length - 1]);
  }

  addSimpleEdgeOrientationTable(pieces, noPruningTable) {
    const EO_SIZE = Math.pow(2, 11);

    return this.addMoveTable({
      size: EO_SIZE,
      doMove: edgeOrientationMove,
      defaultIndex: 0,
      solvedIndexes: pieces.length === 12 ? 0 : getCorrectEdgeOrientations(EO_SIZE, pieces),
    }, noPruningTable);
  }

  addSimpleCornerOrientationTable(pieces, noPruningTable) {
    const CO_SIZE = Math.pow(3, 7);

    return this.addMoveTable({
      size: CO_SIZE,
      doMove: cornerOrientationMove,
      defaultIndex: 0,
      solvedIndexes: pieces.length === 8 ? 0 : getCorrectCornerOrientations(CO_SIZE, pieces),
    }, noPruningTable);
  }

  addSimpleEdgePermutationTable(pieces, noPruningTable) {
    const size = factorial(12) / factorial(12 - pieces.length);
    const defaultIndex = getIndexFromPermutation([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], pieces);

    return this.addMoveTable({
      size,
      doMove: (index, move) => edgePermutationMove(index, move, pieces),
      defaultIndex,
    }, noPruningTable);
  }

  addSimpleCornerPermutationTable(pieces, noPruningTable) {
    const size = factorial(8) / factorial(8 - pieces.length);
    const defaultIndex = getIndexFromPermutation([0, 1, 2, 3, 4, 5, 6, 7], pieces);

    return this.addMoveTable({
      size,
      doMove: (index, move) => cornerPermutationMove(index, move, pieces),
      defaultIndex,
    }, noPruningTable);
  }

  search(indexes, depth, lastMove, solution) {
    let maximumDistance = 0;

    for (let i = 0; i < this.pruningTables.length; i++) {
      const powers = [1];

      for (let j = 1; j < this.pruningTables[i].moveTableIndexes.length; j++) {
        powers.push(this.moveTables[this.pruningTables[i].moveTableIndexes[j - 1]].getSize() * powers[j - 1]);
      }

      let index = 0;

      for (let j = 0; j < this.pruningTables[i].moveTableIndexes.length; j++) {
        index += indexes[this.pruningTables[i].moveTableIndexes[j]] * powers[j];
      }

      const distance = this.pruningTables[i].pruningTable.getPruningValue(index);

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
            updatedIndexes.push(this.moveTables[i].doMove(indexes[i], move * 3 + pow));
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

    for (let i = 0; i < this.moveTables.length; i++) {
      indexes.push(this.moveTables[i].defaultIndex);
    }

    moves.forEach(move => {
      for (let i = 0; i < indexes.length; i++) {
        indexes[i] = this.moveTables[i].doMove(indexes[i], move);
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
