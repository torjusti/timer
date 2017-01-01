import React from 'react';
import { formatElapsedTime } from '../../utils/time';
import classNames from 'classnames';
import Modal from 'react-modal';
import './Result.css';

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

    let formattedTime = (
      <span className={classes}>
        {this.props.plusTwo ?
        `${formatElapsedTime(this.props.time, 2)}+2=${formatElapsedTime(this.props.time + 2000, 2)}` :
        formatElapsedTime(this.props.time, 2)}
      </span>
    );

    return (
      <tr key={this.props.id}>
        <td><span className={classes}>{formattedTime}</span></td>
        <td>{(this.props.currentAo5 && formatElapsedTime(this.props.currentAo5, 2)) || 'N/A'}</td>
        <td>{(this.props.currentAo12 && formatElapsedTime(this.props.currentAo12, 2)) || 'N/A'}</td>
        <td><button onClick={this.props.onDelete}>del</button></td>
        <td><button onClick={this.props.onTogglePlusTwo}>+2</button></td>
        <td><button onClick={this.props.onToggleDNF}>dnf</button></td>
        <td><button onClick={this.openModal}>view</button></td>

        <Modal isOpen={this.state.modalIsOpen} contentLabel="Modal">
          <h2>Manage result</h2>
            <ul>
              <li>Time: {formattedTime}</li>
              <li>Scramble: {this.props.scramble}</li>
            </ul>

          <button onClick={this.closeModal}>Done</button>
        </Modal>
      </tr>
    );
  }
}

export default Result;
