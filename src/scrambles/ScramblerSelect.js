import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { selectedScramblerSelector } from 'sessions/selectors';
import { selectScrambler } from './actions';

// All available scramblers.
const SCRAMBLE_TYPES = [
  '333', 'lse', 'edges', 'corners', 'cmll', 'lsll', 'zbll', '2gll', 'pll',
  'zzls', '222', 'clock', 'minx', '444', '555', '666', '777', '444bf',
  '555bf', 'pyram', 'skewb', 'sq1', 'algs'
];

const WhiteSelect = styled(Select)`
  &&&&& {
    color: #FFF;
  }

  div:focus {
    background: none;
  }

  &&&&&:after, &&&&&:before {
    border-bottom-color: #FFF;
  }

  &&&&&:hover::after, &&&&&:hover::before {
    border-bottom-color: #FFF;
  }

  svg {
    color: #FFF;
  }
`;

const ScramblerSelect = ({ scrambler, handleChange }) => (
  <WhiteSelect
    value={scrambler}
    onChange={event => handleChange(event.target.value)}
  >
    {SCRAMBLE_TYPES.map(scrambler =>
      <MenuItem value={scrambler} key={scrambler}>{scrambler}</MenuItem>
    )}
  </WhiteSelect>
);

const mapStateToProps = state => ({
  scrambler:  selectedScramblerSelector(state),
});

const mapDispatchToProps = dispatch => ({
  handleChange: scrambler => {
    console.log(scrambler)
    dispatch(selectScrambler(scrambler));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScramblerSelect);
