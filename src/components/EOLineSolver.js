import React from 'react';
import EOLineSolver from '../utils/EOLineSolver';

export default ({ currentScramble }) => (
  <div>
    <h2>EOLine Solutions</h2>
    {EOLineSolver(currentScramble)}
  </div>
);
