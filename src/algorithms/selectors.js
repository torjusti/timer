import { createSelector } from 'reselect';

/**
 * Retrieve all algorithms from all sets.
 */
export const getAlgorithms = createSelector(
  state => state.sets,
  sets =>
    [].concat.apply([], Object.keys(sets).map(key => sets[key].algorithms)),
);

/**
 * Returns the algorithm with the given ID.
 */
export const getAlgorithm = createSelector(
  state => state.sets,
  (_, id) => id,
  (sets, id) =>
    Object.values(sets)
      .reduce((acc, set) => [...acc, ...set.algorithms], [])
      .find(alg => alg.id === id),
);
