import Search from './Search';
import { edgeOrientationMove } from './Coordinates';

class EOLineSearcher extends Search {
  initialize() {
    const NUM_FLIPS = Math.pow(2, 11);

    this.addTables({
      size: NUM_FLIPS,
      doMove: edgeOrientationMove,
      defaultIndex: 0,
    });

    this.addSimpleEdgePermutationTable([5, 7]);
  }
}

const solver = new EOLineSearcher();

const EOLineSolver = scramble => solver.solve(scramble);

export default EOLineSolver;
