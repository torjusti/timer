import { cartesian } from './Tools';

class PruningTable {
  constructor(moveTables, moves) {
    this.computePruningTable(moveTables, moves);
  }

  setPruningValue(index, value) {
     this.table[index >> 3] ^= (0xf ^ value) << ((index & 7) << 2);
  }

  getPruningValue(index) {
    return this.table[index >> 3] >> ((index & 7) << 2) & 0xf;
  }

  computePruningTable(moveTables, moves) {
    let size = moveTables.reduce((acc, obj) => acc * obj.getSize(), 1);

    this.table = [];

    for (let i = 0; i < (size + 7) >> 3; i++) {
      this.table.push(-1);
    }

    let depth = 0, done = 0;

    const powers = [1];

    for (let i = 1; i < moveTables.length; i++) {
      powers.push(moveTables[i - 1].getSize() * powers[i - 1]);
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

        for (let moveIndex = 0; moveIndex < moves.length; moveIndex++) {
          const move = moves[moveIndex];

          let currentIndex = index, position = 0;

          for (let i = powers.length - 1; i >= 0; i--) {
            position += powers[i] * moveTables[i].doMove(~~(currentIndex / powers[i]), move);
            currentIndex = currentIndex % powers[i];
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
