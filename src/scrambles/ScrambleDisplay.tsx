import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentScrambleSelector } from '../sessions/selectors';

const StyledScrambleDisplay = styled.span`
  margin: 2rem 2rem 0 2rem;
  font-family: 'Roboto Mono', monospace;
  text-decoration: none;
  text-align: center;
  font-size: 1.5rem;
  color: #000;
  user-select: none;
`;

const ScrambleDisplay: React.FC = () => {
  const currentScramble = useSelector(currentScrambleSelector);

  return (
    <StyledScrambleDisplay>
      {currentScramble || 'Initializing...'}
    </StyledScrambleDisplay>
  );
};

export default ScrambleDisplay;
