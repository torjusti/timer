import React from 'react';

const ResultList = ({ results }) => {
  return (
    <ul className="ResultList">
      {results.map((result) => <li key={result.id}>{result.time}</li>)}
    </ul>
  );
};

export default ResultList;
