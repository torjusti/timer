/* global scramblers */

export const generateScramble = (scrambler) => scramblers[scrambler].getRandomScramble().scramble_string;
