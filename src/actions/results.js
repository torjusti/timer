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

export const toggleDNF = (session, id) => ({
  type: 'TOGGLE_DNF',
  session,
  id,
});
