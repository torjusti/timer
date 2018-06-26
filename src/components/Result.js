import React from 'react';
import { formatResult, formatElapsedTime } from 'utils/time';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Time = styled.span`
  text-decoration: ${props => props.dnf && 'line-through'};
`;

const Result = (props) => {
  const time = (<Time dnf={props.dnf}>{formatResult(props)}</Time>);

  return (
    <tr key={props.id}>
      <td>
        <input
          type="checkbox"
          checked={!!props.selected[props.id]}
          onChange={() => props.handleSelect(props.id)}
        />
      </td>
      <td><Link to={`/result/${props.id}`}>{time}</Link></td>
      <td>{(props.currentAo5 && formatElapsedTime(props.currentAo5, 2)) || 'N/A'}</td>
      <td>{(props.currentAo12 && formatElapsedTime(props.currentAo12, 2)) || 'N/A'}</td>
    </tr>
  );
};

export default Result;
