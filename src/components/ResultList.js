import React from 'react';
import Result from './Result';

const ResultList = ({ results, onDelete }) => {
  return (
    <ul className="ResultList">
      {results.map((result) =>
        <Result key={result.id}
          onDelete={() => onDelete(result.session, result.id)}
          {...result}
        />
      )}
    </ul>
  );
};

export default ResultList;
