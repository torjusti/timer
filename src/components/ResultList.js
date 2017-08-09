import React from 'react';
import Result from './Result';
import styled from 'styled-components';
import { cubingAverage } from '../utils/cubingStatistics';

const Table = styled.table`
  position: absolute;
  width: 100%;
`;

const ResultList = ({ results, onDelete, onTogglePlusTwo, onToggleDNF }) => (
  <Table>
    <thead>
      <tr>
        <th>Time</th>
        <th>ao5</th>
        <th>ao12</th>
        <th colSpan="3">Tools</th>
      </tr>
    </thead>
    <tbody>
      {results.map((result, index) =>
        <Result key={result.id}
          onDelete={() => onDelete(result.id)}
          onTogglePlusTwo={() => onTogglePlusTwo(result.id)}
          onToggleDNF={() => onToggleDNF(result.id)}
          currentAo5={index >= 4 && cubingAverage(results.slice(index - 4, index + 1))}
          currentAo12={index >= 11 && cubingAverage(results.slice(index - 11, index + 1))}
          {...result}
        />
      ).reverse()}
    </tbody>
  </Table>
);

export default ResultList;
