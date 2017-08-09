import { generateScramble } from '../utils/scrambles';

/**
 * Add a new result to the current session.
 */
export const addResult = (time, selectedScrambler) => ({
  type: 'ADD_RESULT',
  id: Date.now(),
  time,
  updatedScramble: generateScramble(selectedScrambler),
});

/**
 * Toggle plus two on the result with the given ID. The
 * result has to be in the current session.
 */
export const togglePlusTwo = (id) => ({
  type: 'TOGGLE_PLUS_TWO',
  id,
});

/**
 * Toggle DNF on the result with the given ID. The
 * result has to be in the current session.
 */
export const toggleDNF = (id) => ({
  type: 'TOGGLE_DNF',
  id,
});

/**
 * Delete the result with the given ID. The result has
 * to be in the current session.
 */
export const deleteResult = (id)  => ({
  type: 'DELETE_RESULT',
  id,
});

/**
 * Accepts an array with IDs which will be deleted. The
 * results have to be in the current session.
 */
export const deleteResults = (ids) => ({
  type: 'DELETE_RESULTS',
  ids,
});
