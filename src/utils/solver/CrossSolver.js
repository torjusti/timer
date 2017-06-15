import Search from './Search';
import PruningTable from './PruningTable';

class CrossSearcher extends Search {
  initialize() {
    this.addSimpleEdgeOrientationTable([4, 5, 6, 7]);
    this.addSimpleEdgePermutationTable([4, 5, 6, 7]);
  }
}

const CrossSolverInstance = new CrossSearcher();

// Force initialization as we use the same tables in the XCross solver.
CrossSolverInstance.initialize();
CrossSolverInstance.initialized = true;

const CrossSolver = scramble => CrossSolverInstance.solve(scramble);

class XCrossSearcher extends Search {
  initialize() {
    this.moveTables = Object.assign([], CrossSolverInstance.moveTables);
    this.pruningTables = Object.assign([], CrossSolverInstance.pruningTables);

    const COMoves = this.addSimpleCornerOrientationTable([4], true);
    const CPMoves = this.addSimpleCornerPermutationTable([4], true);

    const EOMoves = this.addSimpleEdgeOrientationTable([8], true);
    const EPMoves = this.addSimpleEdgePermutationTable([8], true);

    this.addPruningTable([COMoves, CPMoves]);
    this.addPruningTable([EOMoves, EPMoves]);
  }
}

const XCrossSolverInstance = new XCrossSearcher();

const XCrossSolver = scramble => XCrossSolverInstance.solve(scramble);

export { CrossSolver, XCrossSolver };
