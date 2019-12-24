import { createSelector } from 'reselect';
import { selectedSessionSelector } from 'sessions/selectors';
import { CubingStatistics } from './cubingStatistics';

/**
 * Returns an object containing different types of statistics concerning the current array of results.
 */
export const statisticsSelector = createSelector(
  selectedSessionSelector,
  (selectedSession): CubingStatistics | undefined => selectedSession && selectedSession.statistics,
);
