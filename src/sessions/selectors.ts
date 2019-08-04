import { createSelector } from 'reselect';
import { TimerAppState } from '../reducers';
import { SessionState } from './reducers';

export const selectedSessionSelector = createSelector(
  (state: TimerAppState) => state.selectedSession,
  (state: TimerAppState) => state.sessions,
  (selectedSession, sessions): SessionState | undefined =>
    sessions.find(session => session.id === selectedSession) as SessionState,
);

export const currentScrambleSelector = createSelector(
  selectedSessionSelector,
  (selectedSession): string | undefined => selectedSession && selectedSession.scramble,
);

export const selectedScramblerSelector = createSelector(
  selectedSessionSelector,
  (selectedSession): string | undefined => selectedSession && selectedSession.scrambler,
);
