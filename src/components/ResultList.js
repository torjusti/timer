import React from 'react';
import Result from './Result/';
import { cubingAverage } from '../utils/cubingStatistics';

const ResultList = ({ results, onDelete, onTogglePlusTwo, onToggleDNF }) => (
  <table className="ResultList">
    <thead>
      <th>Time</th>
      <th>ao5</th>
      <th>ao12</th>
      <th colSpan="3">Tools</th>
    </thead>
    {results.map((result, index) =>
      <Result key={result.id}
        onDelete={() => onDelete(result.session, result.id)}
        onTogglePlusTwo={() => onTogglePlusTwo(result.session, result.id)}
        onToggleDNF={() => onToggleDNF(result.session, result.id)}
        currentAo5={index >= 4 && cubingAverage(results.slice(index - 4, index + 1))}
        currentAo12={index >= 11 && cubingAverage(results.slice(index - 11, index + 1))}
        {...result}
      />
    )}
  </table>
);

export default ResultList;
