import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { formatElapsedTime } from 'timer/utils';
import { useSelector } from 'react-redux';
import { statisticsSelector } from './selectors';
import { CubingStatistics } from './cubingStatistics';

const StatisticsPaper = styled(Paper)`
  margin: 2rem;
`;

const Statistics: React.FC = () => {
  const statistics = useSelector(statisticsSelector);

  if (statistics === undefined) {
    return null; 
  }

  const descriptions: { [key in keyof Partial<CubingStatistics>]: string } = {
    bestSingle: 'Best single',
    bestAo5: 'Best average of 5',
    bestAo12: 'Best average of 12',
    bestAo100: 'Best average of 100',
    curAo5: 'Current average of 5',
    curAo12: 'Current average of 12',
    curAo100: 'Current average of 100',
  } as const;

  let globalMean = 'N/A';

  if (statistics.globalMean) {
    const time = formatElapsedTime(statistics.globalMean, 2);
    globalMean = statistics.globalDNF ? `DNF (${time})` : time;
  }

  let globalAverage = 'N/A';

  if (statistics.globalAverage) {
    const time = formatElapsedTime(statistics.globalAverage, 2);
    globalAverage = statistics.globalDNF ? `DNF (${time})` : time;
  }

  return (
    <StatisticsPaper>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Number of times</TableCell>
            <TableCell>{statistics.resultCount}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Global mean</TableCell>
            <TableCell>{globalMean}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Global average</TableCell>
            <TableCell>{globalAverage}</TableCell>
          </TableRow>

          {(Object.keys(descriptions) as (keyof CubingStatistics)[]).map((key) => {
            const statistic = statistics[key];

            const formatted = typeof statistic === 'number' ? formatElapsedTime(statistic, 2) : (statistic || 'N/A');

            return (
              <TableRow key={key}>
                <TableCell>{descriptions[key]}</TableCell>

                <TableCell>
                  {formatted}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </StatisticsPaper>
  );
};

export default Statistics;
