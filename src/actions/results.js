import { generateScramble } from '../utils/scrambles';

export const addResult = (time, selectedScrambler) => ({
  type: 'ADD_RESULT',
  id: Date.now(),
  time,
  updatedScramble: generateScramble(selectedScrambler),
});

export const togglePlusTwo =  (id) => ({
  type: 'TOGGLE_PLUS_TWO',
  id,
});

export const deleteResult = (id)  => ({
  type: 'DELETE_RESULT',
  id,
});

/**
 * Accepts an array with IDs which will be deleted.
 */
export const deleteResults = (ids) => ({
  type: 'DELETE_RESULTS',
  ids,
});

export const toggleDNF = (id) => ({
  type: 'TOGGLE_DNF',
  id,
});
