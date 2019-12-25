import React from 'react';
import styled from 'styled-components';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { Penalty, setPenalty } from 'sessions/actions';
import { resultsSelector } from 'results/selectors';


const SwitchContainer = styled(ToggleButtonGroup)`
  display: flex;
  justify-content: center;
`;

const PenaltySwitch = ({ id }: { id?: string }) => {
  const dispatch = useDispatch();

  const results = useSelector(resultsSelector);
  const lastResult = results && results[0];

  const handleChange = (event: React.MouseEvent<Element, MouseEvent>, penalty: string) => {
    if (lastResult) {
      if (penalty === 'none') {
        dispatch(setPenalty(lastResult.id, undefined));
      } else if (penalty === 'plus') {
        dispatch(setPenalty(lastResult.id, Penalty.PLUS_TWO));
      } else if (penalty === 'dnf') {
        dispatch(setPenalty(lastResult.id, Penalty.DNF));
      }
    }
  };

  const disabled = !(lastResult && lastResult.id === id);

  let selectedPenalty = 'none';

  if (!disabled && lastResult) {
    if (lastResult.penalty === Penalty.DNF) {
      selectedPenalty = 'dnf';
    } else if (lastResult.penalty === Penalty.PLUS_TWO) {
      selectedPenalty = 'plus';
    }
  }

  return (
    <SwitchContainer value={selectedPenalty} onChange={handleChange} exclusive>
      <ToggleButton disabled={disabled} value="none">None</ToggleButton>
      <ToggleButton disabled={disabled} value="plus">+2</ToggleButton>
      <ToggleButton disabled={disabled} value="dnf">DNF</ToggleButton>
    </SwitchContainer>
  );
};

export default PenaltySwitch;
