import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { selectedScramblerSelector } from 'sessions/selectors';
import { selectScrambler } from 'sessions/actions';

const scramblers: { [key: string]: string } = {
  '333': '3x3 cube',
  '222': '2x2 cube',
  '444': '4x4 cube',
  '555': '5x5 cube',
  '666': '6x6 cube',
  '777': '7x7 cube',
  'clock': 'Clock',
  'minx': 'Pyraminx',
  '444bf': '4x4 blindfolded',
  '555bf': '5x5 blindfolded',
  'pyram': 'Pyraminx',
  'skewb': 'Skewb',
  'sq1': 'Square-1',
  'lse': 'LSE',
  'edges': 'Edges only',
  'corners': 'Corners only',
  'cmll': 'CMLL',
  'lsll': 'LSLL',
  'zbll': 'ZBLL',
  '2gll': '2GLL',
  'pll': 'PLL',
  'zzls': 'ZZLS',
};

const WhiteSelect = styled(Select)`
  &:after, &:before, &&&&:hover::after, &&&&:hover::before {
    border-bottom-color: #fff;
  }

  .MuiSelect-selectMenu, svg {
    color: #fff;
  }
`;

const ScramblerSelect: React.FC = () => {
  const dispatch = useDispatch();

  const scrambler = useSelector(selectedScramblerSelector);

  return (
    <WhiteSelect
      value={scrambler}
      onChange={event => dispatch(selectScrambler(event.target.value as Scrambler))}
    >
      {Object.keys(scramblers).map(scrambler => (
        <MenuItem value={scrambler} key={scrambler}>
          {scramblers[scrambler]}
        </MenuItem>
      ))}
    </WhiteSelect>
  );
};

export default ScramblerSelect;
