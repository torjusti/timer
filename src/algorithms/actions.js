import uuid from 'uuid/v4';
import store from 'store';
import { interval } from './spacedRepetition';
import { getAlgorithm } from './selectors';

export const CREATE_SET = 'CREATE_SET';
export const SELECT_SET = 'SELECT_SET';
export const ADD_ALGORITHM = 'ADD_ALGORITHM';
export const DELETE_SET = 'DELETE_SET';
export const GRADE_ALGORITHM = 'GRADE_ALGORITHM';
export const SET_CURRENT_ALGORITHM = 'SET_CURRENT_ALGORITHM';

/**
 * Creates a new set with the given name.
 * An unique ID is also generated and passed on.
 */
export const createSet = name => ({
  type: CREATE_SET,
  name,
  id: uuid(),
});

/**
 * Selects the set with the given ID.
 */
export const selectSet = id => ({
  type: SELECT_SET,
  id,
});

/**
 * Adds a given algorithm to the set with the given ID.
 */
export const addAlgorithm = (algorithm, set) => ({
  type: ADD_ALGORITHM,
  algorithm,
  set,
  id: uuid(),
});

/**
 * Deletes the set with the given ID.
 */
export const deleteSet = id => ({
  type: DELETE_SET,
  id,
});

/**
 * Grades the algorithm with the given ID.
 */
export const gradeAlgorithm = (id, grade) => ({
  type: GRADE_ALGORITHM,
  id,
  data: interval(getAlgorithm(store.getState(), id), grade),
});

/**
 * Sets the algorithm with is currently being learned.
 */
export const setCurrentAlgorithm = id => ({
  type: SET_CURRENT_ALGORITHM,
  id,
});
