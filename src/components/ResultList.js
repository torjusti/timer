import React from 'react';
import { formatElapsedTime } from '../utils/time';

const ResultList = ({ results }) => {
  return (
    <ul className="ResultList">
      {results.map((result) => <li key={result.id}>{formatElapsedTime(result.time, 2)}</li>)}
    </ul>
  );
};

export default ResultList;
