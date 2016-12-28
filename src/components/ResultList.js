import React from 'react';
import Result from './Result/';

const ResultList = ({ results, onDelete, onTogglePlusTwo, onToggleDNF }) => (
  <ul className="ResultList">
    {results.map((result) =>
      <Result key={result.id}
        onDelete={() => onDelete(result.session, result.id)}
        onTogglePlusTwo={() => onTogglePlusTwo(result.session, result.id)}
        onToggleDNF={() => onToggleDNF(result.session, result.id)}
        {...result}
      />
    )}
  </ul>
);

export default ResultList;
