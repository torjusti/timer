import { createSelector } from 'reselect';
import { selectedSessionSelector } from 'sessions/selectors';
import { Result } from 'sessions/actions';
import { TimerAppState } from 'reducers';

/**
 * Retrieve the array containing all results in the currently selected session.
 */
export const resultsSelector = createSelector(
  selectedSessionSelector,
  (selectedSession): Result[] | undefined => selectedSession && selectedSession.results,
);

/**
 * Retrive a single result based in its ID. Note that the function will only
 * find results stored in the currently selected session.
 */
export const resultSelector = createSelector(
  resultsSelector,
  (state: TimerAppState, id: string) => id,
  (results, id): Result | undefined => results && results.find(r => r.id === id),
);
