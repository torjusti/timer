import { createSelector } from 'reselect';
import { getResults } from './results';
import { calculateStatistics } from '../utils/cubingStatistics';

/**
 * Returns an object containing different types of
 * statistics concerning the current array of results.
 */
export const statisticsSelector = createSelector(
  getResults,
  results => calculateStatistics(results),
);