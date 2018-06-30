import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'theme';

// All available scramblers.
const SCRAMBLE_TYPES = ['333', 'lse', 'edges', 'corners', 'cmll', 'lsll', 'zbll',
  '2gll', 'pll', 'zzls', '222', 'clock', 'minx', '444', '555', '666', '777',
  '444bf', '555bf', 'pyram', 'skewb', 'sq1', 'algs'];

const ScrambleMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: ${theme.header};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  padding: 1em;
  z-index: 1;

  @media (min-width: 960px) {
    justify-content: space-between;
    align-items: center;
  }
`;

const ScrambleSelector = styled.select`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #1c4182;
  margin-right: 1rem;

  @media (max-width: 960px) {
    flex-grow: 1;
  }
`;

const ScrambleDisplay = styled.div`
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 960px) {
    width: 100%;
    margin: 1rem 0;
  }
`;

const ScrambleDisplayAlgLink = styled.a`
  color: #FFF;
  text-decoration: none;
  font-family: monospace;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  height: 2rem;

  @media (min-width: 960px) {
    order: 3;
  }
`;

const HeaderButton = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  cursor: pointer;
  border-radius: 2px;
  color: #FFF;
  background: ${theme.header.darken(0.1)};
  padding: 0 .8em;
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const ScrambleMenu = ({ currentScramble, selectedScrambler, onScramblerChange }) => (
  <ScrambleMenuContainer>
    <ScrambleSelector value={selectedScrambler} onChange={(e) => onScramblerChange(e.target.value)}>
      {SCRAMBLE_TYPES.map((scrambleType) =>
        <option value={scrambleType} key={scrambleType}>{scrambleType}</option>
      )}
    </ScrambleSelector>

    <HeaderButtons>
      <HeaderButton to="/algorithms">
        <span className="cubing-icon event-333"></span>
      </HeaderButton>

      <HeaderButton to="/settings">
        <i className="fa fa-cog" aria-hidden="true"></i>
      </HeaderButton>
    </HeaderButtons>

    <ScrambleDisplay>
      <ScrambleDisplayAlgLink href={`https://alg.cubing.net/?setup=${currentScramble}`} target="_blank">
        {currentScramble || 'No scramble available'}
      </ScrambleDisplayAlgLink>
    </ScrambleDisplay>
  </ScrambleMenuContainer>
);

export default ScrambleMenu;
