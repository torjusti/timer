/* global scramblers */

import { getScramble } from './spacedRepetition';

export const generateScramble = (scrambler) => {
  // The algorithm memory mode is not provided by JSSS.
  if (scrambler === 'algs') {
    return getScramble();
  } else {
    return scramblers[scrambler].getRandomScramble().scramble_string.trim();
  }
};
