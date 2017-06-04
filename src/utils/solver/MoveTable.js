class MoveTable {
  constructor(size, doMove) {
    this.createMoveTable(size, doMove);
  }

  createMoveTable(size, doMove) {
    this.table = [];

    for (let i = 0; i < size; i++) {
      this.table.push([]);

      for (let move = 0; move < 18; move++) {
        this.table[i].push(doMove(i, move));
      }
    }
  }

  doMove(index, move) {
    return this.table[index][move];
  }
}

export default MoveTable;
