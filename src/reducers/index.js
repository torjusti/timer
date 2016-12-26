import { selectedSession, sessions } from './sessions';
import results from './results';

const timerApp = (state = {}, action) => {
  const intermediateState = {
    sessions: sessions(state.sessions, action),
    results: results(state.results, action),
  };

  switch (action.type) {
    case "CREATE_SESSION":
      return {
        ...intermediateState,
        selectedSession: selectedSession(state.selectedSession, action, intermediateState.sessions),
      }

    default:
      return {
        ...intermediateState,
        selectedSession: selectedSession(state.selectedSession, action),
      }
  }
};

export default timerApp;
