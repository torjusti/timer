import React from 'react';
import styled from 'styled-components';
import { formatElapsedTime } from 'timer/utils';

const StatList = styled.ul`
  margin: 0;
`;

const Statistics = ({ statistics, resultCount }) => {
  const descriptions = {
    bestSingle: 'Best single',
    bestAo5: 'Best average of 5',
    bestAo12: 'Best average of 12',
    bestAo100: 'Best average of 100',
    curAo5: 'Current average of 5',
    curAo12: 'Current average of 12',
    curAo100: 'Current average of 100',
  };

  const globalMean = statistics.globalMean ?
    statistics.globalDNF ? `DNF (${formatElapsedTime(statistics.globalMean, 2)})`
      : formatElapsedTime(statistics.globalMean, 2) : 'N/A';

  const globalAverage = statistics.globalAverage ?
    statistics.globalDNF ? `DNF (${formatElapsedTime(statistics.globalAverage, 2)})`
      : formatElapsedTime(statistics.globalAverage, 2) : 'N/A';

  return (
    <div>
      <StatList>
        <li>Number of times: {resultCount}</li>
        <li>Global mean: {globalMean}</li>
        <li>Global average: {globalAverage}</li>

        {Object.keys(descriptions).map(key =>
          <li key={key}>
            {descriptions[key]}: {statistics[key] ?
              formatElapsedTime(statistics[key], 2) : 'N/A'}
          </li>
        )}
      </StatList>
    </div>
  );
};

export default Statistics;
