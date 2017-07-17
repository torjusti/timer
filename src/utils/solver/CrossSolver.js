import Search from './Search';
import PruningTable from './PruningTable';

class CrossSearcher extends Search {
  initialize() {
    this.addSimpleEdgeOrientationTable([4, 5, 6, 7]);
    this.addSimpleEdgePermutationTable([4, 5, 6, 7]);
  }
}

const solver = new CrossSearcher();

const CrossSolver = scramble => solver.solve(scramble).next().value;

export default CrossSolver;
