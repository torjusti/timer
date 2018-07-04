export const SELECT_SCRAMBLER = 'SELECT_SCRAMBLER';
export const SET_SCRAMBLE = 'SET_SCRAMBLE';

/**
 * Updates the scrambler which is selected in the
 * currently selected session.
 */
export const selectScrambler = scrambler => ({
  type: SELECT_SCRAMBLER,
  scrambler,
});

/**
 * Used by the scramble saga to update the current scramble.
 */
export const setScramble = scramble => ({
  type: SET_SCRAMBLE,
  scramble,
});
