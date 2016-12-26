import React from 'react';
import { formatElapsedTime } from '../utils/time';

const Result = ({ id, time, onDelete, onTogglePlusTwo, plusTwo }) => (
  <li key={id}>
    {formatElapsedTime(time, 2)}{plusTwo && `+2=${formatElapsedTime(time + 2000, 2)}`}
    <button onClick={onDelete}>del</button>
    <button onClick={onTogglePlusTwo}>+2</button>
  </li>
);

export default Result;
