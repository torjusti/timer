import { generateScramble } from '../utils/scrambles';

/**
 * Updates the scrambler which is selected in the
 * currently selected session.
 */
export const selectScrambler = (scrambler) => ({
  type: 'SELECT_SCRAMBLER',
  scrambler,
  updatedScramble: generateScramble(scrambler),
});
