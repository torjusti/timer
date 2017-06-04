import Search from './solver/Search';

const solver = new Search([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [5, 7]);

const EOLineSolver = scramble => solver.solve(scramble);

export default EOLineSolver;
