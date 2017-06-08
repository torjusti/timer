import React from 'react';
import EOLineSolver from '../utils/solver/EOLineSolver';
import CrossSolver from '../utils/solver/CrossSolver';
import XCrossSolver from '../utils/solver/XCrossSolver';

export default ({ currentScramble }) => (
  <div>
    EOLine: {EOLineSolver(currentScramble)}
    Cross: {CrossSolver(currentScramble)}
    XCross: {XCrossSolver(currentScramble)}
  </div>
);
