import { selectedSession, sessions } from './sessions';
import results from './results';
import { selectedScrambler, currentScramble } from './scrambles.js';

const timerApp = (state = {}, action) => {
  const updatedState = {
    selectedScrambler: selectedScrambler(state.selectedScrambler, action),
  };

  updatedState.currentScramble = currentScramble(state.currentScramble, action, updatedState.selectedScrambler);

  updatedState.selectedSession = selectedSession(state.selectedSession, action, updatedState.sessions);

  updatedState.sessions = sessions(
    state.sessions,
    action,
    updatedState.selectedSession,
    updatedState.selectedScrambler,
    updatedState.currentScramble,
  );

  return updatedState;
};

export default timerApp;
