import { formatElapsedTime } from 'timer/utils';
import { Penalty, Result } from 'sessions/actions';

/**
 * Format result for displaying in the result list.
 */
export const formatResult = (result: Result) => {
  const time = formatElapsedTime(result.time, 2);

  if (result.penalty === Penalty.DNF) {
    return `${time} - DNF`;
  } else if (result.penalty === Penalty.PLUS_TWO) {
    return `${time} + 2 = ${formatElapsedTime(result.time + 2000, 2)}`;
  }

  return time;
};
