import { generateScramble } from '../utils/scrambles';

export const selectScrambler = (scrambler) => ({
  type: 'SELECT_SCRAMBLER',
  scrambler,
  updatedScramble: generateScramble(scrambler),
});
