import { createSelector } from 'reselect';

/**
 * Retrieve the array containing all results in the currently selected session.
 */
export const getResults = createSelector(
  state => state.sessions,
  state => state.selectedSession,
  (sessions, selectedSession) => sessions.find((session) => session.id === selectedSession).results,
);

/**
 * Retrive a single result based in its ID. Note that the function will only
 * find results stored in the currently selected session.
 */
export const getResult = createSelector(
  state => state.sessions,
  state => state.selectedSession,
  (_, id) => id,
  (sessions, selectedSession, id) =>
    sessions.find((session) => session.id === selectedSession).results
    .find(r => id && /^\d+$/.test(id) && r.id === parseInt(id, 10)),
);
