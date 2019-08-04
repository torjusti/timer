import React from 'react';
import styled from 'styled-components';
import { formatElapsedTime } from './utils';
import { createPortal } from 'react-dom';

export enum TimerDisplayState {
  IDLE,
  HOLDING,
  READY,
  RUNNING,
}

interface TimerDisplayProps {
  state: TimerDisplayState;
  time: number;
}

const getDisplayColor = (state: TimerDisplayState) => {
  switch (state) {
    case TimerDisplayState.HOLDING:
      return 'red';
    
    case TimerDisplayState.READY:
      return 'green';

    default:
      return 'black';
  }
};

const StyledTimerDisplay = styled.div<{ state: TimerDisplayState }>`
  color: ${({ state }) => getDisplayColor(state)};

  font-family: monospace;
  font-size: 7rem;
  user-select: none;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 10rem;
  }
`;

const getFullDisplayVisible = (state: TimerDisplayState) =>
  state === TimerDisplayState.READY || state === TimerDisplayState.RUNNING;

const StyledFullDisplay = styled(StyledTimerDisplay)<{ state: TimerDisplayState }>`
  display: ${({ state }) =>  getFullDisplayVisible(state) ? 'flex' : 'none'};

  justify-content: center;
  align-items: center;
  position: fixed;
  background: #fff;
  z-index: 2000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, state }) => {
  const digits = state === TimerDisplayState.RUNNING ? 1 : 2;
  const formattedTime = formatElapsedTime(time, digits);

  const FullDisplay = () => createPortal((
    <StyledFullDisplay state={state}>
      {formattedTime}
    </StyledFullDisplay>
  ), document.body);

  return (
    <>
      <FullDisplay />

      <StyledTimerDisplay state={state}>
        {formattedTime}
      </StyledTimerDisplay>
    </>
  );
};

export default TimerDisplay;
