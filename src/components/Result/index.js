import React from 'react';
import { formatElapsedTime } from '../../utils/time';
import classNames from 'classnames';
import './Result.css';

const Result = ({ id, time, onDelete, onTogglePlusTwo, plusTwo, onToggleDNF, dnf }) => {
  const classes = classNames('ResultTime', { dnf });

  return (
    <li key={id}>
      <span className={classes}>
        {formatElapsedTime(time, 2)}{plusTwo && `+2=${formatElapsedTime(time + 2000, 2)}`}
      </span>
      <button onClick={onDelete}>del</button>
      <button onClick={onTogglePlusTwo}>+2</button>
      <button onClick={onToggleDNF}>dnf</button>
    </li>
  );
};


export default Result;
