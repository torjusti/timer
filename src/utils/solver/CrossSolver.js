import Search from './Search';

class CrossSearcher extends Search {
  initialize() {
    this.addSimpleEdgeOrientationTable([4, 5, 6, 7]);
    this.addSimpleEdgePermutationTable([4, 5]);
    this.addSimpleEdgePermutationTable([6, 7]);
  }
}

const solver = new CrossSearcher();

const CrossSolver = scramble => solver.solve(scramble);

export default CrossSolver;
