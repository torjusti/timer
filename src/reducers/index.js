import { selectedSession, sessions } from './sessions';
import results from './results';
import { selectedScrambler, currentScramble } from './scrambles.js';

const timerApp = (state = {}, action) => ({
  sessions: sessions(state.sessions, action),

  get selectedSession() {
    switch (action.type) {
      case "CREATE_SESSION":
        return selectedSession(state.selectedSession, action, this.sessions);

      default:
        return selectedSession(state.selectedSession, action);
    }
  },

  get results() {
    switch (action.type) {
      case "ADD_RESULT":
        return results(state.results, action, this.selectedScrambler, this.currentScramble);

      default:
        return results(state.results, action);
    }
  },

  selectedScrambler: selectedScrambler(state.selectedScrambler, action),

  get currentScramble() {
    return currentScramble(state.currentScramble, action, this.selectedScrambler);
  },
});

export default timerApp;
