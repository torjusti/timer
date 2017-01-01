import { average } from './statistics';

// Returns whether a given list of results is a DNF average or not.
export const isDNF = (results) => results.filter((r) => r.dnf).length >= 2;

// Converts results to a list of numbers and accounts for +2 penalties.
export const timesFromResults = (results) => results.map((r) => (r.plusTwo ? r.time + 2000 : r.time));

// Returns the average of a given set of results.
// Does not support a number of results less than 5.
export const cubingAverage = (results) => {
  if (results.length >= 5) {
    return isDNF(results) ? 'DNF' : average(timesFromResults(results));
  }

  return null;
}

// Returns a list where each index is the current average of num at that index.
export const cubingAverages = (results, num) => {
  if (results.length < num) {
    return null;
  }

  return results.map((result, index) => {
    if (index >= num - 1) {
      return cubingAverage(results.slice(index - num + 1, index + 1));
    }

    return undefined;
  });
};

// Returns the fastest average given a list of averages.
export const fastestCubingAverage = (results, num) => {
  const averages = cubingAverages(results, num);

  if (!averages) {
    return null;
  }

  const fastest = Math.min.apply(Math, averages.filter((r) => isFinite(r)));

  return isFinite(fastest) ? fastest : 'DNF';
};
