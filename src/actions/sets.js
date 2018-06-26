import uuid from 'uuid/v4';
import store from 'store';
import { interval } from 'utils/spacedRepetition';
import { getAlgorithm } from 'selectors/sets';

export const CREATE_SET = 'CREATE_SET';
export const SELECT_SET = 'SELECT_SET';
export const ADD_ALGORITHM = 'ADD_ALGORITHM';
export const DELETE_SET = 'DELETE_SET';
export const GRADE_ALGORITHM = 'GRADE_ALGORITHM';
export const SET_CURRENT_ALGORITHM = 'SET_CURRENT_ALGORITHM';

export const createSet = (name) => ({
  type: CREATE_SET,
  name,
  id: uuid(),
});

export const selectSet = (id) => ({
  type: SELECT_SET,
  id,
});

export const addAlgorithm = (algorithm, set) => ({
  type: ADD_ALGORITHM,
  algorithm,
  set,
  id: uuid(),
});

export const deleteSet = (id) => ({
  type: DELETE_SET,
  id,
});

export const gradeAlgorithm = (id, grade) => ({
  type: GRADE_ALGORITHM,
  id,
  data: interval(getAlgorithm(store.getState(), id), grade),
});

export const setCurrentAlgorithm = (id) => ({
  type: SET_CURRENT_ALGORITHM,
  id,
});
