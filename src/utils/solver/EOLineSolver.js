import Search from './Search';

class EOLineSearcher extends Search {
  initialize() {
    this.addSimpleEdgeOrientationTable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    this.addSimpleEdgePermutationTable([5, 7]);
  }
}

const solver = new EOLineSearcher();

const EOLineSolver = scramble => solver.solve(scramble).next().value;

export default EOLineSolver;
