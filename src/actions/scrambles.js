import { generateScramble } from 'utils/scrambles';

export const SELECT_SCRAMBLER = 'SELECT_SCRAMBLER';

/**
 * Updates the scrambler which is selected in the
 * currently selected session.
 */
export const selectScrambler = (scrambler) => ({
  type: SELECT_SCRAMBLER,
  scrambler,
  updatedScramble: generateScramble(scrambler),
});
