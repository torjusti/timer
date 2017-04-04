import { createSelector } from 'reselect';

// Get the results in the current session.
export const getResults = createSelector(
  state => state.results,
  state => state.selectedSession,
  (results, selectedSession) => results.filter((result) => result.session === selectedSession),
);

// Get a single result.
export const getResult = createSelector(
  state => state.results,
  (_, id) => id,
  (results, id) => results.find(r => id && /^\d+$/.test(id) && r.id === parseInt(id, 10)),
);
