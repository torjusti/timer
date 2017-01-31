import React from 'react';
import { formatResult } from '../utils/time';

const BigResult = ({ result }) => result ? (
  <ul>
    <li><a href={`https://alg.cubing.net/?setup=${result.scramble}`} target="_blank">{result.scramble}</a></li>
    <li>Time: {formatResult(result)}</li>
  </ul>
) : (
  <p>No result found with given ID</p>
);

export default BigResult;
