import Search from './Search';

class XCrossSearcher extends Search {
  initialize() {
    const EOMoves = this.addSimpleEdgeOrientationTable([4, 5, 6, 7, 8], true);
    const EPMoves = this.addSimpleEdgePermutationTable([4, 5, 6, 7, 8], true);

    const COMoves = this.addSimpleCornerOrientationTable([4], true);
    const CPMoves = this.addSimpleCornerPermutationTable([4], true);

    this.addPruningTable([EOMoves, CPMoves]);
    this.addPruningTable([COMoves, CPMoves]);
    this.addPruningTable([EPMoves]);
  }
}

const XCrossSolverInstance = new XCrossSearcher();

const XCrossSolver = scramble => XCrossSolverInstance.solve(scramble).next().value;

export default XCrossSolver;
