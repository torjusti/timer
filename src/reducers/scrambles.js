import { generateScramble } from '../utils/scrambles';

export const selectedScrambler = (state = '333', action) => {
  switch (action.type) {
    case "SELECT_SCRAMBLER":
      return action.scrambler;

    default:
      return state;
  }
};

export const currentScramble = (state = generateScramble(333), action) => {
  switch (action.type) {
    case "SELECT_SCRAMBLER":
      return action.updatedScramble;

    case "ADD_RESULT":
      return action.updatedScramble;

    default:
      return state;
  }
};
