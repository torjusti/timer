import { Solutions, SET_SOLUTIONS } from './actions';
import { Action } from 'reducers';

type SolutionsState = Solutions | undefined;

const solutionsReducer = (state: SolutionsState, action: Action): SolutionsState => {
  switch (action.type) {
    case SET_SOLUTIONS:
      return action.payload;

    default:
      return state;
  }
};

export default solutionsReducer;
