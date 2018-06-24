import { createSelector } from 'reselect';

/**
 * Returns the object with the ID corresponding to the
 * currently selected session.
 */
export const selectedSessionSelector = createSelector(
  state => state.selectedSession,
  state => state.sessions,
  (selectedSession, sessions) => sessions
    .find(session => session.id === selectedSession),
);

/**
 * Returns the scramble currently active in the currently
 * selected session.
 */
export const currentScrambleSelector = createSelector(
  selectedSessionSelector,
  selectedSession => selectedSession && selectedSession.currentScramble,
);

/**
 * Returns the currently selected scrambler in the
 * currently selected session.
 */
export const selectedScramblerSelector = createSelector(
  selectedSessionSelector,
  selectedSession => selectedSession && selectedSession.selectedScrambler,
);