import { createSelector } from 'reselect';
import { resultsSelector } from 'results/selectors';
import { calculateStatistics, CubingStatistics } from 'statistics/cubingStatistics';
import { Result } from 'sessions/actions';
import { TimerAppState } from 'reducers';

/**
 * Returns an object containing different types of
 * statistics concerning the current array of results.
 */
export const statisticsSelector = createSelector<TimerAppState, Result[] | undefined, CubingStatistics | undefined>(
  resultsSelector,
  (results) => results && calculateStatistics(results),
);
