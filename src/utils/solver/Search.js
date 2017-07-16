import { parseScramble, formatMoveSequence } from './Scrambles';
import MoveTable from './MoveTable';
import PruningTable from './PruningTable';
import { getIndexFromPermutation, edgePermutationMove, edgeOrientationMove, cornerOrientationMove, cornerPermutationMove } from './Coordinates';
import { factorial, getCorrectEdgeOrientations, getCorrectCornerOrientations } from './Tools';

class Search {
  constructor() {
    this.moveTables = [];

    this.pruningTables = [];

    this.moves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  }

  addPruningTable(moveTableIndexes) {
    // We need the size of the tables to be sorted, as we encode indexes in different
    // bases when working with composite tables.
    moveTableIndexes.sort((a, b) => this.moveTables[a].getSize() - this.moveTables[b].getSize());

    const moveTables = [];

    moveTableIndexes.forEach(i => moveTables.push(this.moveTables[i]));

    const pruningTable = new PruningTable(moveTables, this.moves);

    this.pruningTables.push({
      pruningTable,
      moveTableIndexes,
    });
  }

  addMoveTable(settings, noPruningTable) {
    const moveTable = new MoveTable(settings.size, settings.doMove, settings.defaultIndex, settings.solvedIndexes, this.moves);

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
      if (this.checkLastMove) {
        return this.checkLastMove(lastMove);
      }

      return true;
    }

    for (let i = 0; i < this.moves.length; i++) {
      const move = this.moves[i];

      if (~~(move / 3) !== ~~(lastMove / 3) && ~~(move / 3) !== ~~(lastMove / 3) - 3) {
          const updatedIndexes = [];

          for (let j = 0; j < indexes.length; j++) {
            updatedIndexes.push(this.moveTables[j].doMove(indexes[j], move));
          }

          const result = this.search(updatedIndexes, depth - 1, move, solution);

          if (result) {
            solution.push(move);
            return true;
          }
      }
    }

    return false;
  }

  getIndexes(moves) {
    const indexes = [];

    for (let i = 0; i < this.moveTables.length; i++) {
      indexes.push(this.moveTables[i].defaultIndex);
    }

    moves.forEach(move => {
      for (let i = 0; i < indexes.length; i++) {
        indexes[i] = this.moveTables[i].doMove(indexes[i], move);
      }
    });

    return indexes;
  }

  solve(scramble, minDepth, maxDepth, lastMove) {
    if (!this.initialized) {
      this.initialize();
      this.initialized = true;
    }

    const moves = parseScramble(scramble);

    const indexes = this.getIndexes(moves);

    const solution = [];

    console.log(lastMove)
    // Every cube is solvable with a depth of 20. However, such depths are too slow to ever end up solved.
    for (let depth = minDepth || 0; depth < maxDepth || 20; depth++) {
      if (this.search(indexes, depth, lastMove || -1, solution)) {
        break;
      }
    }

    solution.reverse();

    return formatMoveSequence(solution);
  }
}

export default Search;
