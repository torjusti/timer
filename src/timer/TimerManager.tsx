import React, { RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addResult } from 'sessions/actions';
import Timer from './Timer';
import { currentScrambleSelector } from 'sessions/selectors';

interface Props {
  touchContainer: RefObject<HTMLElement>;
}

const TimerManager: React.FC<Props> = ({ touchContainer }) => {
  const dispatch = useDispatch();

  const scramble = useSelector(currentScrambleSelector);
  
  const handleFinished = (time: number) => {
    if (scramble) {
      dispatch(addResult(time, scramble));
    }
  };

  return (
    <Timer
      onSolveFinished={handleFinished}
      disabled={scramble === undefined}
      touchContainer={touchContainer}
    />
  );
};

export default TimerManager;
