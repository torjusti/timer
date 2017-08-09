import { generateScramble } from '../utils/scrambles';

/**
 * Update the selected scrambler. This setting is global
 * across all sessions, and is usually updated by manually
 * changing the scramble type in the header dropdown menu.
 */
export const selectScrambler = (scrambler) => ({
  type: 'SELECT_SCRAMBLER',
  scrambler,
  updatedScramble: generateScramble(scrambler),
});
