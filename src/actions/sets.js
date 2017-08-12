import uuid from 'uuid/v4';

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
