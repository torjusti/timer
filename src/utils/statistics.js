/**
 * Returns the sum of all provided entries.
 */
export const sum = (entries) => {
  return entries.reduce((entry, accumulator) => accumulator + entry, 0);
};

/**
 * Returns the average of all provided entries.
 */
export const mean = (entries) => {
  return sum(entries) / entries.length;
};

/**
 * Returns the index of the first and last element
 * not included in the given percentile.
 */
export const getPercentiles = (entries, percentile, sorted) => {
  if (!sorted) {
    entries.sort((a, b) => (a - b));
  }

  return {
    start: Math.floor(entries.length * percentile) + 1,
    end: Math.floor(entries.length * (1 - percentile)) - 1,
  };
};

/**
 * Average using the cubing definition. The top and bottom five
 * percent of entries are ignored when the mean is calculated.
 */
export const average = (entries, sorted, percentileToRemove = 5 /  100) => {
  if (!sorted) {
    entries.sort((a, b) => (a - b));
  }

  const percentiles = getPercentiles(entries, percentileToRemove, true);
  return mean(entries.slice(percentiles.start, percentiles.end + 1));
};
