import React from 'react';
import EOLineSolver from '../utils/EOLineSolver';

export default ({ currentScramble }) => (
  <div>
    {EOLineSolver(currentScramble)}
  </div>
);
