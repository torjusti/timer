import React from 'react';
import styled from 'styled-components';
import EOLineSolver from '../utils/solver/EOLineSolver';
import CrossSolver from '../utils/solver/CrossSolver';
import XCrossSolver from '../utils/solver/XCrossSolver';
import { SidebarHeader } from './Sidebar';

const SolverTitle = styled.span`
  font-style: italic;
`;

export default ({ currentScramble, scrambler }) => scrambler === '333' && (
  <div>
    <SidebarHeader>Solutions</SidebarHeader>
    <ul>
      <li><SolverTitle>EOLine:</SolverTitle> {EOLineSolver(currentScramble)}</li>
      <li><SolverTitle>Cross:</SolverTitle> {CrossSolver(currentScramble)}</li>
      <li><SolverTitle>XCross:</SolverTitle> {XCrossSolver(currentScramble)}</li>
    </ul>
  </div>
);
