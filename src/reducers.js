import {
  selectedSession,
  sessions,
  sessionsDialogVisibility,
} from 'sessions/reducers';
import { sets, selectedSet, currentAlgorithm } from 'algorithms/reducers';
import recordMessageIsVisible from 'records/reducers';
import drawerVisible from 'app/reducers';

const timerApp = (state = {}, action) => {
  const updatedState = {
    selectedSet: selectedSet(state.selectedSet, action),
    sets: sets(state.sets, action),
    currentAlgorithm: currentAlgorithm(state.currentAlgorithm, action),
    recordMessageIsVisible: recordMessageIsVisible(
      state.recordMessageIsVisible,
      action,
    ),
    drawerVisible: drawerVisible(state.drawerVisible, action),
    sessionsDialogVisibility: sessionsDialogVisibility(
      state.sessionsDialogVisibility,
      action,
    ),
  };

  updatedState.sessions = sessions(
    state.sessions,
    action,
    // We do not need to pass the updated selected session, as
    // the actions which change this do not require this knowledge
    // in the sessions reducer.
    state.selectedSession,
  );

  updatedState.selectedSession = selectedSession(
    state.selectedSession,
    action,
    updatedState.sessions,
  );

  return updatedState;
};

export default timerApp;
