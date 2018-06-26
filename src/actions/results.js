import uuid from 'uuid/v4';
import { generateScramble } from 'utils/scrambles';

/**
 * Add a new result to the current session.
 */
export const addResult = (time, selectedScrambler) => ({
  type: 'ADD_RESULT',
  id: uuid(),
  time,
  updatedScramble: generateScramble(selectedScrambler),
});

/**
 * Toggle plus two on the result with the given ID. The
 * result has to be in the current session.
 */
export const togglePlusTwo = (ids) => ({
  type: 'TOGGLE_PLUS_TWO',
  ids,
});

/**
 * Toggle DNF on the result with the given ID. The
 * result has to be in the current session.
 */
export const toggleDNF = (ids) => ({
  type: 'TOGGLE_DNF',
  ids,
});

/**
 * Delete the result with the given ID. The result has
 * to be in the current session.
 */
export const deleteResult = (ids)  => ({
  type: 'DELETE_RESULT',
  ids,
});
