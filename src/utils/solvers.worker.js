import CrossSolver from './solver/CrossSolver';
import XCrossSolver from './solver/XCrossSolver';
import EOLineSolver from './solver/EOLineSolver';
import FirstBlockSolver from './solver/FirstBlockSolver';

onmessage = event => {
  const scramble = JSON.parse(event.data).scramble;

  setTimeout(() => {
  postMessage(JSON.stringify({
    Cross: CrossSolver(scramble),
    XCross: XCrossSolver(scramble),
    EOLine: EOLineSolver(scramble),
    FirstBlock: FirstBlockSolver(scramble),
    scramble, // Used to only rerender when the scramble changes.
  }));
}, 5000);
};
