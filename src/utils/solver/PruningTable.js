class PruningTable {
  constructor(size, moveTable, solvedIndexes) {
    this.computePruningTable(size, moveTable, solvedIndexes);
  }

  setPruningValue(index, value) {
    if ((index & 1) === 0) {
      this.table[Math.floor(index / 2)] &= 0xf0 | value;
    } else {
      this.table[Math.floor(index / 2)] &= 0x0f | (value << 4);
    }
  }

  getPruningValue(index) {
    if ((index & 1) === 0) {
      return this.table[Math.floor(index / 2)] & 0x0f;
    } else {
      return (this.table[Math.floor(index / 2)] & 0xf0) >>> 4;
    }
  }

  computePruningTable(size, moveTable, solvedIndexes) {
    let tableSize = Math.floor(size / 2);

    if (tableSize % 2 !== 0) {
      tableSize += 1;
    }

    this.table = [];

    for (let i = 0; i < tableSize; i++) {
      this.table.push(-1);
    }

    if (solvedIndexes) {
      for (let index of solvedIndexes) {
        this.setPruningValue(index, 0);
      }
    }

    let depth = 0;

    while (depth !== size) {
      for (let index = 0; index < size; index++) {
        if (this.getPruningValue(index) !== depth) {
          continue;
        }

        for (let move = 0; move < 18; move++) {
          let position = moveTable.doMove(index, move);

          if (this.getPruningValue(position) === 0x0f) {
            this.setPruningValue(position, depth + 1);
          }
        }
      }

      depth++;
    }
  }
}

export default PruningTable;
