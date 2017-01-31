import React from 'react';
import { formatResult, formatElapsedTime } from '../utils/time';
import classNames from 'classnames';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Link } from 'react-router';

const Time = styled.span`
  text-decoration: ${props => props.dnf && 'line-through'};
`;

class Result extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    const classes = classNames({
      dnf: this.props.dnf,
    });

    const time = (<Time dnf={this.props.dnf}>{formatResult(this.props)}</Time>);

    return (
      <tr key={this.props.id}>
        <td><Link to={`/result/${this.props.id}`}>{time}</Link></td>
        <td>{(this.props.currentAo5 && formatElapsedTime(this.props.currentAo5, 2)) || 'N/A'}</td>
        <td>{(this.props.currentAo12 && formatElapsedTime(this.props.currentAo12, 2)) || 'N/A'}</td>
        <td><button onClick={this.props.onDelete}>del</button></td>
        <td><button onClick={this.props.onTogglePlusTwo}>+2</button></td>
        <td><button onClick={this.props.onToggleDNF}>dnf</button></td>
        <td><Link to={`/result/${this.props.id}`} /></td>
      </tr>
    );
  }
}

export default Result;
