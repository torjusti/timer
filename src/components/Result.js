import React from 'react';
import { formatElapsedTime } from '../utils/time';

const Result = ({ id, time, onDelete }) => (
  <li key={id}>
    {formatElapsedTime(time, 2)}
    <button onClick={onDelete}>del</button>
  </li>
);

export default Result;
