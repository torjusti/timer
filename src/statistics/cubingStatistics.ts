import { Result, Penalty } from 'sessions/actions';

/**
 * Returns the sum of all provided entries.
 */
export const sum = (entries: number[]): number => {
  return entries.reduce((entry, accumulator) => accumulator + entry, 0);
};

/**
 * Returns the average of all provided entries.
 */
export const mean = (entries: number[]): number => {
  return sum(entries) / entries.length;
};

interface Percentile {
  start: number;
  end: number;
}

/**
 * Returns the index of the first and last element
 * not included in the given percentile. Input needs
 * to be sorted.
 */
export const getPercentiles = (entries: number[], percentile: number): Percentile => {
  return {
    start: Math.floor(entries.length * percentile) + 1,
    end: Math.floor(entries.length * (1 - percentile)) - 1,
  };
};

/**
 * Average using the cubing definition. The top and bottom five
 * percent of entries are ignored when the mean is calculated.
 */
export const average = (entries: number[], percentileToRemove = 5 / 100): number => {
  entries.sort((a, b) => a - b);

  const percentiles = getPercentiles(entries, percentileToRemove);
  return mean(entries.slice(percentiles.start, percentiles.end + 1));
};

// Returns whether a given list of results is a DNF average or not.
export const isDNF = (results: Result[]): boolean =>
  results.filter(r => r.penalty === Penalty.DNF).length >= 2;

// Converts results to a list of numbers while accounting for penalties.
export const timesFromResults = (results: Result[]): number[] =>
  results.map(r => (r.penalty === Penalty.PLUS_TWO ? r.time + 2000 : r.time));

// Returns the average of a given set of results.
// Does not support a number of results less than 5.
export const cubingAverage = (results: Result[]): number | string | undefined => {
  if (results.length >= 5) {
    return isDNF(results) ? 'DNF' : average(timesFromResults(results));
  }
};

// Returns a list where each index is the current average of num at that index.
export const cubingAverages = (results: Result[], num: number): ReturnType<typeof cubingAverage>[] | undefined => {
  if (results.length < num) {
    return;
  }

  return results.map((result, index) => {
    if (index >= num - 1) {
      return cubingAverage(results.slice(index - num + 1, index + 1));
    }

    return undefined;
  });
};

// Returns the fastest average given a list of averages.
export const fastestCubingAverage = (results: Result[], num: number) => {
  const averages = cubingAverages(results, num);

  if (averages) {
    const fastest = Math.min(
      ...averages.filter((average): average is number => typeof average === 'number' && isFinite(average)),
    );

    return isFinite(fastest) ? fastest : 'DNF';
  }
};

export interface CubingStatistics {
  resultCount?: number;
  bestSingle?: number;
  globalMean?: number;
  globalAverage?: number;
  globalDNF?: boolean;
  bestAo5?: number | string;
  bestAo12?: number | string;
  curAo5?: number | string;
  curAo12?: number | string;
  curAo100?: number | string;
  bestAo100?: number | string;
}

export const calculateStatistics = (results: Result[]): CubingStatistics => {
  const times = timesFromResults(results);

  return {
    // Total amount of results.
    resultCount: times.length,
    // Best single in the entire session.
    bestSingle: times.length > 0 ? Math.min(...times) : undefined,
    // Mean ignoring DNF results.
    globalMean: times.length ? mean(times) : undefined,
    // Average ignoring DNF results.
    globalAverage: times.length >= 5 ? average(times) : undefined,
    // 2 DNF results means both mean and average are also DNF.
    globalDNF: isDNF(results),
    // Fastest average of 5.
    bestAo5: fastestCubingAverage(results, 5),
    // Fastest average of 12.
    bestAo12: fastestCubingAverage(results, 12),
    // Current average of 5.
    curAo5: results.length >= 5 ? cubingAverage(results.slice(-5)) : undefined,
    // Current average of 12.
    curAo12: results.length >= 12 ? cubingAverage(results.slice(-12)) : undefined,
    // Current average of 100.
    curAo100: results.length >= 100 ? cubingAverage(results.slice(-100)) : undefined,
    // Best average of 100.
    bestAo100: fastestCubingAverage(results, 100),
  };
};
