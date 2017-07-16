import CrossSolver from './solver/CrossSolver';
import XCrossSolver from './solver/XCrossSolver';
import EOLineSolver from './solver/EOLineSolver';
import FirstBlockSolver from './solver/FirstBlockSolver';
import Kociemba from './solver/Kociemba';

onmessage = event => {
  const scramble = JSON.parse(event.data).scramble;

  postMessage(JSON.stringify({
    Cross: CrossSolver(scramble),
    XCross: XCrossSolver(scramble),
    EOLine: EOLineSolver(scramble),
    FirstBlock: FirstBlockSolver(scramble),
    Kociemba: Kociemba(scramble),
    scramble, // Used to only rerender when the scramble changes.
  }));
};
