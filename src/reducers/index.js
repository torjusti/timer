import { selectedSession, sessions } from './sessions';
import { selectedScrambler, currentScramble } from './scrambles';
import { sets, selectedSet } from './sets';

const timerApp = (state = {}, action) => {
  const updatedState = {
    selectedScrambler: selectedScrambler(state.selectedScrambler, action),
    sets: sets(state.sets, action),
    selectedSet: selectedSet(state.selectedSet, action),
  };

  updatedState.currentScramble = currentScramble(state.currentScramble, action, updatedState.selectedScrambler);

  updatedState.sessions = sessions(
    state.sessions,
    action,
    // We do not need to pass the updated selected session, as
    // the actions which change this do not require this knowledge
    // in the sessions reducer.
    state.selectedSession,
    updatedState.selectedScrambler,
    updatedState.currentScramble,
  );

  updatedState.selectedSession = selectedSession(state.selectedSession, action, updatedState.sessions);

  return updatedState;
};

export default timerApp;
