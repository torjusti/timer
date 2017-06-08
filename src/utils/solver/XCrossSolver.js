import Search from './Search';
import { factorial, getCorrectOrientations } from './Tools';
import MoveTable from './MoveTable';
import PruningTable from './PruningTable';

import {
  getIndexFromPermutation,
  edgeOrientationMove,
  edgePermutationMove,
  cornerOrientationMove,
  cornerPermutationMove,
} from './Coordinates';

class XCrossSearcher extends Search {
  initialize() {
    this.addSimpleEdgeOrientationTable([4, 5, 6, 7]);
    this.addSimpleEdgePermutationTable([4, 5]);
    this.addSimpleEdgePermutationTable([4, 5, 6]);
    this.addSimpleCornerOrientationTable([4]);
    this.addSimpleCornerPermutationTable([4]);
  }
}

const solver = new XCrossSearcher();

const XCrossSolver = scramble => solver.solve(scramble);

export default XCrossSolver;
