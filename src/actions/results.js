import { generateScramble } from '../utils/scrambles';

export const addResult = (session, time, selectedScrambler) => ({
  type: 'ADD_RESULT',
  id: Date.now(),
  session,
  time,
  updatedScramble: generateScramble(selectedScrambler),
});

export const togglePlusTwo =  (session, id) => ({
  type: 'TOGGLE_PLUS_TWO',
  session,
  id,
});

export const deleteResult = (session, id)  => ({
  type: 'DELETE_RESULT',
  session,
  id,
});

/**
 * Accepts an array with IDs which will be deleted.
 */
export const deleteResults = (session, ids) => ({
  type: 'DELETE_RESULTS',
  session,
  ids,
});

export const toggleDNF = (session, id) => ({
  type: 'TOGGLE_DNF',
  session,
  id,
});
