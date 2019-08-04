export const SET_SOLUTIONS = 'SET_SOLUTIONS';

export interface Solutions {
  eoline: string;
  cross: string;
  xcross: string;
  fb: string;
}

export interface SetSolutionsAction {
  type: typeof SET_SOLUTIONS;
  payload?: Solutions;
}

export const setSolutions = (solutions?: Solutions) => ({
  type: SET_SOLUTIONS,
  payload: solutions
})

export type SolversAction = SetSolutionsAction;
