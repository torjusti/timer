import React, { RefObject, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addResult, Penalty } from 'sessions/actions';
import Timer from './Timer';
import { currentScrambleSelector, selectedSessionSelector } from 'sessions/selectors';
import { TimerAppState } from 'reducers';
import PenaltySwitch from './PenaltySwitch';

interface Props {
  touchContainer: RefObject<HTMLElement>;
}

const TimerManager: React.FC<Props> = ({ touchContainer }) => {
  const dispatch = useDispatch();

  const [lastResult, setLastResult] = useState<string>();
  
  const scramble = useSelector(currentScrambleSelector);
  const useInspection = useSelector((state: TimerAppState) => state.settings.inspectionEnabled);
  const selectedSessionObject = useSelector(selectedSessionSelector);
  
  const selectedSession = selectedSessionObject && selectedSessionObject.id;

  useEffect(() => {
    setLastResult(undefined);
  }, [selectedSession]);

  const handleFinished = (time: number, penalty?: Penalty) => {    
    if (scramble) {
      const resultAction = addResult(time, scramble, penalty);
      setLastResult(resultAction.payload.id);
      dispatch(resultAction);
    }
  };

  return (
    <>
      <Timer
        onSolveFinished={handleFinished}
        disabled={scramble === undefined}
        touchContainer={touchContainer}
        useInspection={useInspection}
        selectedSession={selectedSession}
      />

      <PenaltySwitch id={lastResult} />
    </>
  );
};

export default TimerManager;
