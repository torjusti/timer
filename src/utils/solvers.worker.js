import CrossSolver from './solver/CrossSolver';
import XCrossSolver from './solver/XCrossSolver';
import EOLineSolver from './solver/EOLineSolver';

onmessage = event => {
  const scramble = JSON.parse(event.data).scramble;

  postMessage(JSON.stringify({
    Cross: CrossSolver(scramble),
    XCross: XCrossSolver(scramble),
    EOLine: EOLineSolver(scramble),
    scramble, // Used to only rerender when the scramble changes.
  }));
};
