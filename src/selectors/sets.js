import { createSelector } from 'reselect';

/**
 * Retrieve all algorithms from all sets.
 */
export const getAlgorithms = createSelector(
  (state) => state.sets,
  (sets) => [].concat.apply([], Object.keys(sets).map((key) => sets[key].algorithms)),
);

/**
 * Returns the algorithm with the given ID.
 */
export const getAlgorithm = createSelector(
  (state) => state.sets,
  (_, id) => id,
  (sets, id) => Object.keys(sets).map((key) => sets[key])
    .find((set) => set.algorithms.map((alg) =>
    alg.id).indexOf(id) >= 0).algorithms.find((alg) => alg.id === id),
);
