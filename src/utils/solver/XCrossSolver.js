import Search from './Search';

class XCrossSearcher extends Search {
  initialize() {
    this.addSimpleEdgeOrientationTable([4, 5, 6, 7, 8]);
    this.addSimpleEdgePermutationTable([4, 5]);
    this.addSimpleEdgePermutationTable([6, 7, 8]);
    this.addSimpleCornerOrientationTable([4]);
    this.addSimpleCornerPermutationTable([4]);
  }
}

const solver = new XCrossSearcher();

const XCrossSolver = scramble => solver.solve(scramble);

export default XCrossSolver;
