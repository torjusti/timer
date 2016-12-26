import { combineReducers } from 'redux';
import { selectedSession, sessions } from './sessions';
import results from './results';

const timerApp = combineReducers({
  results,
  sessions,
  selectedSession,
});

export default timerApp;
