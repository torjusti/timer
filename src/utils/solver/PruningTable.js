import { cartesian } from './Tools';

class PruningTable {
  constructor(moveTables) {
    this.computePruningTable(moveTables);
  }

  setPruningValue(index, value) {
    if ((index & 1) === 0) {
      this.table[~~(index / 2)] &= 0xf0 | value;
    } else {
      this.table[~~(index / 2)] &= 0x0f | (value << 4);
    }
  }

  getPruningValue(index) {
    if ((index & 1) === 0) {
      return this.table[~~(index / 2)] & 0x0f;
    } else {
      return (this.table[~~(index / 2)] & 0xf0) >>> 4;
    }
  }

  computePruningTable(moveTables) {
    let size = moveTables.reduce((acc, obj) => acc * obj.moveTable.getSize(), 1);

    let tableSize = ~~(size / 2);

    if (tableSize % 2 !== 0) {
      tableSize += 1;
    }

    this.table = [];

    for (let i = 0; i < tableSize; i++) {
      this.table.push(-1);
    }

    let depth = 0, done = 0;

    const powers = [1];

    for (let i = 1; i < moveTables.length; i++) {
      powers.push(moveTables[i - 1].moveTable.getSize() * powers[i - 1]);
    }

    const permutations = cartesian(moveTables.map(data => data.solvedIndexes));

    for (let i = 0; i < permutations.length; i++) {
      let index = 0;

      for (let j = 0; j < permutations[i].length; j++) {
        index += powers[j] * permutations[i][j];
      }

      this.setPruningValue(index, 0);
      done += 1;
    }

    while (done !== size) {
      for (let index = 0; index < size; index++) {
        if (this.getPruningValue(index) !== depth) {
          continue;
        }

        for (let move = 0; move < 18; move++) {
          const updatedIndexes = [];

          let currentIndex = index;

          for (let i = powers.length - 1; i >= 0; i--) {
            updatedIndexes.unshift(moveTables[i].moveTable.doMove(~~(currentIndex / powers[i]), move));
            currentIndex = currentIndex % powers[i];
          }

          let position = 0;

          for (let i = 0; i < updatedIndexes.length; i++) {
            position += powers[i] * updatedIndexes[i];
          }

          if (this.getPruningValue(position) === 0x0f) {
            this.setPruningValue(position, depth + 1);
            done += 1;
          }
        }
      }

      depth += 1;
    }
  }
}

export default PruningTable;
