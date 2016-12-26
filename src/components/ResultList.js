import React from 'react';
import Result from './Result';

const ResultList = ({ results, onDelete, onTogglePlusTwo }) => {
  console.log(results);
  return (
    <ul className="ResultList">
      {results.map((result) =>
        <Result key={result.id}
          onDelete={() => onDelete(result.session, result.id)}
          onTogglePlusTwo={() => onTogglePlusTwo(result.session, result.id)}
          {...result}
        />
      )}
    </ul>
  );
};

export default ResultList;
