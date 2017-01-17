import React from 'react';
import './ScrambleMenu.css';

const scrambleTypes = ['333', 'lse', 'edges', 'corners', 'cmll', 'lsll', 'zbll',
  '2gll', 'pll', 'zzls', '333fm', '333ft', '333bf', '333oh', '222', 'clock',
  'minx', '444', '555', '666', '777', '444bf', '555bf', 'pyram', 'skewb', 'sq1'];

const ScrambleMenu = ({ currentScramble, selectedScrambler, onScramblerChange }) => (
  <div className="ScrambleMenu">
    <select className="SelectScrambler" value={selectedScrambler} onChange={(e) => onScramblerChange(e.target.value)}>
      {scrambleTypes.map((scrambleType) =>
        <option value={scrambleType} key={scrambleType}>{scrambleType}</option>
      )}
    </select>

    <div className="ScrambleDisplay">
      {currentScramble}
    </div>
  </div>
);

export default ScrambleMenu;
