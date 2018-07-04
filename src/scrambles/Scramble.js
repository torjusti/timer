import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { currentScrambleSelector } from 'sessions/selectors';

const ScrambleLink = styled.a`
  font-size: 1.5rem;
  text-decoration: none;
  color: #000;
  font-family: 'Roboto Mono', monospace;
  text-align: center;
  margin: 2rem 2rem 0 2rem;
`;

const Scramble = ({ currentScramble }) => (
  <ScrambleLink
    href={`https://alg.cubing.net/?setup=${currentScramble}`}
    rel="noopener noreferrer"
    target="_blank"
  >
    {currentScramble || 'No scramble available'}
  </ScrambleLink>
);

const mapStateToProps = state => ({
  currentScramble: currentScrambleSelector(state),
});

export default connect(mapStateToProps)(Scramble);
