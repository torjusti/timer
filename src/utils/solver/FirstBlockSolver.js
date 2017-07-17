import Search from './Search';

class FirstBlockSearch extends Search {
  initialize() {
    const EOMoves = this.addSimpleEdgeOrientationTable([6, 9, 10], true);
    const COMoves = this.addSimpleCornerOrientationTable([5, 6], true);

    const EPMoves = this.addSimpleEdgePermutationTable([6, 9, 10], true);
    const CPMoves = this.addSimpleCornerPermutationTable([5, 6], true);

    this.addPruningTable([EOMoves, CPMoves]);

    this.addPruningTable([COMoves, CPMoves]);

    this.addPruningTable([EPMoves, CPMoves]);
  }
}

const solver = new FirstBlockSearch();

const FirstBlockSolver = scramble => solver.solve(scramble).next().value;

export default FirstBlockSolver;
