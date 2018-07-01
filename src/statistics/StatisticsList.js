import React from 'react';
import styled from 'styled-components';
import { formatElapsedTime } from 'timer/utils';

const StatList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & li {
    border: 1px solid #CCC;
  }

  display: grid;
  grid-template-columns: max-content 1fr;
`;

const Value = styled.span`
  background: #F5F5F5;
  border-bottom: 1px solid #DDD;
  padding: 0.3rem;

  &:nth-child(2n) {
    background: #FFF;
  }
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
          <Value>Number of times</Value>
          <Value>{resultCount}</Value>

          <Value>Global mean</Value>
          <Value>{globalMean}</Value>

          <Value>Global average</Value>
          <Value>{globalAverage}</Value>

          {Object.keys(descriptions).map(key => [
              <Value>{descriptions[key]}</Value>,
              <Value>{statistics[key] ? formatElapsedTime(statistics[key], 2) : 'N/A'}</Value>,
          ])}
      </StatList>
    </div>
  );
};

export default Statistics;

/*

        */
