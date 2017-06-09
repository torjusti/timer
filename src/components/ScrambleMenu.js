import React from 'react';
import styled from 'styled-components';

// All available scramblers.
const scrambleTypes = ['333', 'lse', 'edges', 'corners', 'cmll', 'lsll', 'zbll',
  '2gll', 'pll', 'zzls', '222', 'clock', 'minx', '444', '555', '666', '777',
  '444bf', '555bf', 'pyram', 'skewb', 'sq1'];

const ScrambleSelector = styled.select`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #1c4182;
`;

const ScrambleDisplay = styled.div`
  flex-grow: 1;
  text-align: center;
  font-size: 1.5rem;
`;

const ScrambleDisplayAlgLink = styled.a`
  color: #FFF;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ScrambleMenuContainer = styled.div`
  display: flex;
  width: 100%;
  background: #3875e0;
  padding: 1em;
`;

const ScrambleMenu = ({ currentScramble, selectedScrambler, onScramblerChange }) => (
  <ScrambleMenuContainer>
    <ScrambleSelector value={selectedScrambler} onChange={(e) => onScramblerChange(e.target.value)}>
      {scrambleTypes.map((scrambleType) =>
        <option value={scrambleType} key={scrambleType}>{scrambleType}</option>
      )}
    </ScrambleSelector>

    <ScrambleDisplay>
      <ScrambleDisplayAlgLink href={`https://alg.cubing.net/?setup=${currentScramble}`} target="_blank">
        {currentScramble}
      </ScrambleDisplayAlgLink>
    </ScrambleDisplay>
  </ScrambleMenuContainer>
);

export default ScrambleMenu;
