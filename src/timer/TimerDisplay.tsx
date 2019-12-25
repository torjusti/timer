import React, { Ref } from 'react';
import styled from 'styled-components';
import { formatElapsedTime, formatRemainder } from './utils';

export enum TimerDisplayState {
  IDLE,
  HOLDING,
  READY,
  INSPECTING,
  RUNNING,
}

interface TimerDisplayProps {
  state: TimerDisplayState;
  time: number;
  displayRef: Ref<HTMLDivElement>;
  fullDisplayRef: Ref<HTMLDivElement>;
  inspectionRemainder?: number;
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
  text-align: center;

  @media (min-width: 768px) {
    font-size: 10rem;
  }
`;

const StyledFullDisplay = styled(StyledTimerDisplay)<{ visible: boolean, state: TimerDisplayState }>`
  display: ${({ visible }) => visible ? 'flex' : 'none'};

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

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, state, displayRef, fullDisplayRef, inspectionRemainder }) => {
  const digits = state === TimerDisplayState.RUNNING ? 1 : 2;

  let formattedTime = formatElapsedTime(time, digits);

  const fullDisplayVisible = state === TimerDisplayState.READY || state === TimerDisplayState.RUNNING
    || inspectionRemainder !== undefined;

  return (
    <>
      <StyledFullDisplay ref={fullDisplayRef} visible={fullDisplayVisible} state={state}>
        {(inspectionRemainder !== undefined && state !== TimerDisplayState.RUNNING) ? 
          formatRemainder(inspectionRemainder) : formattedTime}
      </StyledFullDisplay>

      <StyledTimerDisplay state={state} ref={displayRef}>
        {formattedTime}
      </StyledTimerDisplay>
    </>
  );
};

export default TimerDisplay;
