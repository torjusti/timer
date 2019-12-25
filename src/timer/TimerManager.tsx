import React, { RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addResult, Penalty } from 'sessions/actions';
import Timer from './Timer';
import { currentScrambleSelector } from 'sessions/selectors';
import { TimerAppState } from 'reducers';

interface Props {
  touchContainer: RefObject<HTMLElement>;
}

const TimerManager: React.FC<Props> = ({ touchContainer }) => {
  const dispatch = useDispatch();

  const scramble = useSelector(currentScrambleSelector);
  const useInspection = useSelector((state: TimerAppState) => state.settings.inspectionEnabled);

  const handleFinished = (time: number, penalty?: Penalty) => {
    if (scramble) {
      dispatch(addResult(time, scramble, penalty));
    }
  };

  return (
    <Timer
      onSolveFinished={handleFinished}
      disabled={scramble === undefined}
      touchContainer={touchContainer}
      useInspection={useInspection}
    />
  );
};

export default TimerManager;
