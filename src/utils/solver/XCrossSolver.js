import Search from './Search';

class XCrossSearcher extends Search {
  initialize() {
    this.addSimpleEdgeOrientationTable([4, 5, 6, 7, 8]);
    this.addSimpleEdgePermutationTable([4, 5, 6, 7, 8]);

    const COMoves = this.addSimpleCornerOrientationTable([4], true);
    const CPMoves = this.addSimpleCornerPermutationTable([4], true);

    this.addPruningTable([COMoves, CPMoves]);
  }
}

const XCrossSolverInstance = new XCrossSearcher();

const XCrossSolver = scramble => XCrossSolverInstance.solve(scramble);

export default XCrossSolver;
