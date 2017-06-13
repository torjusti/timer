class MoveTable {
  constructor(size, doMove) {
    this.createMoveTable(size, doMove);
  }

  createMoveTable(size, doMove) {
    this.table = [];

    for (let i = 0; i < size; i++) {
      this.table.push([]);
    }

    // For each index, loop through all moves and compute the
    // resulting index after applying the move, and also map the
    // inverse move back to the inital index.
    for (let i = 0; i < size; i++) {
      for (let move = 0; move < 18; move++) {
        if (!this.table[i][move]) {
          const result = doMove(i, move);

          this.table[i][move] = result;

          const pow = move % 3;

          let inverse = move - pow;

          if (pow === 0) {
            inverse += 2;
          } else if (pow === 1) {
            inverse += 1;
          }

          this.table[result][inverse] = i;
        }
      }
    }
  }

  doMove(index, move) {
    return this.table[index][move];
  }
}

export default MoveTable;
