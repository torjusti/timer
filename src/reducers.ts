import { selectedSession, sessions } from './sessions/reducers';
import { SessionAction } from './sessions/actions';
import solutionsReducer from 'solvers/reducers';
import { SolversAction } from 'solvers/actions';
import { SettingsAction, SET_STORE_DATA } from 'settings/actions';
import settings from 'settings/reducers';

export interface TimerAppState {
  selectedSession: ReturnType<typeof selectedSession>;
  sessions: ReturnType<typeof sessions>;
  solutions: ReturnType<typeof solutionsReducer>;
  settings: ReturnType<typeof settings>;
}

export type Action = SessionAction | SolversAction | SettingsAction;

const timerApp = (state: Partial<TimerAppState> | undefined = {}, action: Action): TimerAppState => {
  // Handle loading data from file.
  if (action.type === SET_STORE_DATA) {
    return action.payload;
  }

  const updatedState: Partial<TimerAppState> = {
    solutions: solutionsReducer(state.solutions, action),
    settings: settings(state.settings, action),
  };

  updatedState.sessions = sessions(
    state.sessions,
    action,
    state.selectedSession,
  );

  updatedState.selectedSession = selectedSession(
    state.selectedSession,
    action,
    updatedState.sessions,
  );

  return updatedState as TimerAppState;
};

export default timerApp;
