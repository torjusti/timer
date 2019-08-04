import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentScrambleSelector } from '../sessions/selectors';

const ScrambleLink = styled.a`
  margin: 2rem 2rem 0 2rem;
  font-family: 'Roboto Mono', monospace;
  text-decoration: none;
  text-align: center;
  font-size: 1.5rem;
  color: #000;
`;

const ScrambleDisplay: React.FC = () => {
  const currentScramble = useSelector(currentScrambleSelector);

  return (
    <ScrambleLink
      href={`https://alg.cubing.net/?setup=${currentScramble}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {currentScramble || 'Initializing...'}
    </ScrambleLink>
  );
};

export default ScrambleDisplay;
