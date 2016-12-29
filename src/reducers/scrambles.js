/* global scramblers */

export const selectedScrambler = (state = '333', action) => {
  switch (action.type) {
    case "SELECT_SCRAMBLER":
      return action.scrambler;

    default:
      return state;
  }
};

const generateScramble = (scrambler) => {
  let scramble = scramblers[scrambler].getRandomScramble().scramble_string;
  return scramble.split().join(' '); // Fix occasional double-spaces.
};

export const currentScramble = (state = generateScramble(333), action, selectedScrambler) => {
  switch (action.type) {
    case "SELECT_SCRAMBLER":
      return generateScramble(selectedScrambler);

    case "ADD_RESULT":
      return generateScramble(selectedScrambler);

    default:
      return state;
  }
};
