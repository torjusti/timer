import React from 'react';
import styled from 'styled-components';
import { average, mean } from '../utils/statistics';
import { formatElapsedTime } from '../utils/time';
import { isDNF, fastestCubingAverage, cubingAverage, timesFromResults } from '../utils/cubingStatistics';

const calculateStatistics = (results) => {
  const times = timesFromResults(results);

  return {
    // Best single in the entire session.
    bestSingle: Math.min(...times),
    // Mean ignoring DNF results.
    globalMean: times.length ? mean(times) : null,
    // Average ignoring DNF results.
    globalAverage: times.length >= 5 ? average(times) : null,
    // 2 DNF results means both mean and average are also DNF.
    globalDNF: isDNF(results),
    // Fastest average of 5.
    bestAo5: fastestCubingAverage(results, 5),
    // Fastest average of 12.
    bestAo12: fastestCubingAverage(results, 12),
    // Current average of 5.
    curAo5: results.length >= 5 ? cubingAverage(results.slice(-5)) : null,
    // Current average of 12.
    curAo12: results.length >= 12 ? cubingAverage(results.slice(-12)) : null,
  };
};

const StatList = styled.ul`
  margin: 0;
`;

const Statistics = ({ results }) => {
  const stats = calculateStatistics(results);

  const globalMean = stats.globalMean ?
    stats.globalDNF ? `DNF (${formatElapsedTime(stats.globalMean, 2)})` : formatElapsedTime(stats.globalMean, 2) :
    'N/A';

  const globalAverage = stats.globalAverage ?
    stats.globalDNF ? `DNF (${formatElapsedTime(stats.globalAverage, 2)})` : formatElapsedTime(stats.globalAverage, 2) :
    'N/A';

  const bestSingle = stats.bestSingle ? formatElapsedTime(stats.bestSingle, 2) : 'N/A';
  const bestAo5 = stats.bestAo5 ? formatElapsedTime(stats.bestAo5, 2) : 'N/A';
  const bestAo12 = stats.bestAo12 ? formatElapsedTime(stats.bestAo12, 2) : 'N/A';
  const curAo5 = stats.curAo5 ? formatElapsedTime(stats.curAo5, 2) : 'N/A';
  const curAo12 = stats.curAo12 ? formatElapsedTime(stats.curAo12, 2) : 'N/A';

  return (
    <div className="Statistics">
      <StatList>
        <li>Number of times: {results.length}</li>
        <li>Best single: {bestSingle}</li>
        <li>Global mean: {globalMean}</li>
        <li>Global average: {globalAverage}</li>
        <li>Best ao5: {bestAo5}</li>
        <li>Best ao12: {bestAo12}</li>
        <li>Current ao5: {curAo5}</li>
        <li>Current ao12: {curAo12}</li>
      </StatList>
    </div>
  );
};

export default Statistics;
