import uuid from 'uuid/v4';
import store from '../store';
import { interval } from '../utils/spacedRepetition';
import { getAlgorithm } from '../selectors/sets';

export const createSet = (name) => ({
  type: 'CREATE_SET',
  name,
  id: uuid(),
});

export const selectSet = (id) => ({
  type: 'SELECT_SET',
  id,
});

export const addAlgorithm = (algorithm, set) => ({
  type: 'ADD_ALGORITHM',
  algorithm,
  set,
  id: uuid(),
});

export const deleteSet = (id) => ({
  type: 'DELETE_SET',
  id,
});

export const gradeAlgorithm = (id, grade) => ({
  type: 'GRADE_ALGORITHM',
  id,
  data: interval(getAlgorithm(store.getState(), id), grade),
});

export const setCurrentAlgorithm = (id) => ({
  type: 'SET_CURRENT_ALGORITHM',
  id,
});
