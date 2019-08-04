import { selectedSession, sessions } from './sessions/reducers';
import { SessionAction } from './sessions/actions';
import solutionsReducer from 'solvers/reducers';
import { SolversAction } from 'solvers/actions';

export interface TimerAppState {
  selectedSession: ReturnType<typeof selectedSession>;
  sessions: ReturnType<typeof sessions>;
  solutions: ReturnType<typeof solutionsReducer>;
}

export type Action = SessionAction | SolversAction;

const timerApp = (state: Partial<TimerAppState> | undefined = {}, action: Action): TimerAppState => {
  const updatedState: Partial<TimerAppState> = {
    solutions: solutionsReducer(state.solutions, action),
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
