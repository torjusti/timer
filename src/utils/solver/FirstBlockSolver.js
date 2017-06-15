import Search from './Search';

class FirstBlockSearch extends Search {
  initialize() {
    this.addSimpleEdgeOrientationTable([6, 9, 10]);
    this.addSimpleCornerOrientationTable([5, 6]);
    
    const EPMoves = this.addSimpleEdgePermutationTable([6, 9, 10], true);
    const CPMoves = this.addSimpleCornerPermutationTable([5, 6], true);

    this.addPruningTable([EPMoves, CPMoves]);
  }
}

const solver = new FirstBlockSearch();

const FirstBlockSolver = scramble => solver.solve(scramble);

export default FirstBlockSolver;
