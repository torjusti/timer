import uuid from 'uuid/v4';

export const ADD_RESULT = 'ADD_RESULT';
export const SET_PENALTY = 'SET_PENALTY';
export const DELETE_RESULT = 'DELETE_RESULT';

export const Penalties = {
  NONE: 0,
  PLUS_TWO: 1,
  DNF: 2,
};

/**
 * Add a new result to the current session.
 */
export const addResult = (time, selectedScrambler) => ({
  type: ADD_RESULT,
  id: uuid(),
  time,
});

export const setPenalty = (id, penalty) => ({
  type: SET_PENALTY,
  id,
  penalty,
});

/**
 * Delete the results with the given identificators. The result has
 * to be in the current session.
 */
export const deleteResult = (ids)  => ({
  type: DELETE_RESULT,
  ids,
});
