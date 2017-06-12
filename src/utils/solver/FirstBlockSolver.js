import Search from './Search';

class FirstBlockSearch extends Search {
  initialize() {
    this.addSimpleEdgeOrientationTable([6, 9, 10]);
    this.addSimpleEdgePermutationTable([6, 9, 10]);
    this.addSimpleCornerOrientationTable([5, 6]);
    this.addSimpleCornerPermutationTable([5, 6]);
  }
}

const solver = new FirstBlockSearch();

const FirstBlockSolver = scramble => solver.solve(scramble);

export default FirstBlockSolver;
