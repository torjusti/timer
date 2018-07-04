import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { formatElapsedTime } from 'timer/utils';

const StatisticsPaper = styled(Paper)`
  margin: 2rem;
`;

const Statistics = ({ statistics, resultCount }) => {
  const descriptions = {
    bestSingle: 'Best single',
    bestAo5: 'Best average of 5',
    bestAo12: 'Best average of 12',
    bestAo100: 'Best average of 100',
    curAo5: 'Current average of 5',
    curAo12: 'Current average of 12',
    curAo100: 'Current average of 100',
  };

  const globalMean = statistics.globalMean
    ? statistics.globalDNF
      ? `DNF (${formatElapsedTime(statistics.globalMean, 2)})`
      : formatElapsedTime(statistics.globalMean, 2)
    : 'N/A';

  const globalAverage = statistics.globalAverage
    ? statistics.globalDNF
      ? `DNF (${formatElapsedTime(statistics.globalAverage, 2)})`
      : formatElapsedTime(statistics.globalAverage, 2)
    : 'N/A';

  return (
    <StatisticsPaper>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Number of times</TableCell>
            <TableCell>{resultCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Global mean</TableCell>
            <TableCell>{globalMean}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Global average</TableCell>
            <TableCell>{globalAverage}</TableCell>
          </TableRow>
          {Object.keys(descriptions).map(key => (
            <TableRow key={key}>
              <TableCell>{descriptions[key]}</TableCell>
              <TableCell>
                {statistics[key]
                  ? formatElapsedTime(statistics[key], 2)
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StatisticsPaper>
  );
};

export default Statistics;
