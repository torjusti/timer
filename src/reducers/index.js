import { selectedSession, sessions } from './sessions';
import results from './results';
import { selectedScrambler, currentScramble } from './scrambles.js';

const timerApp = (state = {}, action) => {
  const updatedState = {
    sessions: sessions(state.sessions, action),
    selectedScrambler: selectedScrambler(state.selectedScrambler, action),
  };

  updatedState.currentScramble = currentScramble(state.currentScramble, action, updatedState.selectedScrambler);

  switch (action.type) {
    case "DELETE_SESSION":
      updatedState.selectedSession = selectedSession(state.selectedSession, action, updatedState.sessions);
      break;

    case "CREATE_SESSION":
      updatedState.selectedSession = selectedSession(state.selectedSession, action, updatedState.sessions);
      break;

    default:
      updatedState.selectedSession = selectedSession(state.selectedSession, action);
  }

  switch (action.type) {
    case "ADD_RESULT":
      updatedState.results = results(state.results, action, updatedState.selectedScrambler, updatedState.currentScramble);
      break;

    default:
      updatedState.results = results(state.results, action);
  }

  return updatedState;
};

export default timerApp;
