import React from 'react';
import { formatElapsedTime } from '../../utils/time';
import classNames from 'classnames';
import './Result.css';

const Result = ({ id, time, onDelete, onTogglePlusTwo, plusTwo, onToggleDNF, dnf, currentAo5, currentAo12 }) => {
  const classes = classNames('ResultTime', { dnf });

  return (
    <tr key={id}>
      <td>
        <span className={classes}>
          {formatElapsedTime(time, 2)}{plusTwo && `+2=${formatElapsedTime(time + 2000, 2)}`}
        </span>
      </td>
      <td>{currentAo5 && formatElapsedTime(currentAo5, 2) || 'N/A'}</td>
      <td>{currentAo12 && formatElapsedTime(currentAo12, 2) || 'N/A'}</td>
      <td><button onClick={onDelete}>del</button></td>
      <td><button onClick={onTogglePlusTwo}>+2</button></td>
      <td><button onClick={onToggleDNF}>dnf</button></td>
    </tr>
  );
};


export default Result;
