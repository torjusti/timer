import { crossSolver, EOLineSolver, firstBlockSolver } from 'cube-solver';

onmessage = event => {
  const scramble = JSON.parse(event.data).scramble;

  postMessage(JSON.stringify({
    Cross: crossSolver(scramble),
    EOLine: EOLineSolver(scramble),
    FirstBlock: firstBlockSolver(scramble),
    scramble, // Used to re-render when the scramble changes.
  }));
};
