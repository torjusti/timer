import { selectedSession, sessions } from './sessions';
import { sets, selectedSet, currentAlgorithm } from './sets';
import recordMessageIsVisible from './statistics';

const timerApp = (state = {}, action) => {
  const updatedState = {
    selectedSet: selectedSet(state.selectedSet, action),
    sets: sets(state.sets, action),
    currentAlgorithm: currentAlgorithm(state.currentAlgorithm, action),
    recordMessageIsVisible: recordMessageIsVisible(state.recordMessageIsVisible, action),
  };

  updatedState.sessions = sessions(
    state.sessions,
    action,
    // We do not need to pass the updated selected session, as
    // the actions which change this do not require this knowledge
    // in the sessions reducer.
    state.selectedSession,
  );

  updatedState.selectedSession = selectedSession(state.selectedSession, action, updatedState.sessions);

  return updatedState;
};

export default timerApp;
