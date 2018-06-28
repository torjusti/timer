import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const SelectSessionMenu = styled.select`
  width: 100%;
`;

const SessionName = styled.input`
  width: 100%;
  margin-top: .3em;
`;

const SessionButton = styled.button`
  margin: .3em .3em 0 0;
`;

const ModalStyles = {
  overlay: {
    zIndex: 2,
  },

  content: {
    zIndex: 3,
  },
};

class SessionMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      sessionName: '',
      showConfirmDelete: false,
      showConfirmClear: false,
    };
  }

  handleChange(event) {
    this.props.onSessionChange(event.target.value);
  }

  handleSessionNameChange(event) {
    this.setState({
      sessionName: event.target.value,
    });
  }

  handleSessionRename() {
    if (this.state.sessionName) {
      this.props.onSessionRenamed(this.props.selectedSession, this.state.sessionName);

      this.setState({
        sessionName: '',
      });
    }
  }

  handleSessionClear() {
    this.props.onSessionCleared(this.props.selectedSession);
    this.hideClearModal();
  }

  handleSessionCreation() {
    if (this.state.sessionName) {
      this.props.onSessionCreate(this.state.sessionName);

      this.setState({
        sessionName: '',
      });
    }
  }

  handleSessionDeletion() {
    // Do not allow deleting the last session.
    if (this.props.sessions.length > 1) {
      this.props.onSessionDelete(this.props.selectedSession);
    }

    this.hideDeleteModal();
  }

  // Attempt creating session when enter is pressed.
  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.handleSessionCreation();
    }
  }

  showDeleteModal() {
    if (this.props.sessions.length > 1) {
      this.setState({
        showConfirmDelete: true,
      });
    }
  }

  hideDeleteModal() {
    this.setState({
      showConfirmDelete: false,
    });
  }

  showClearModal() {
    this.setState({
      showConfirmClear: true,
    });
  }

  hideClearModal() {
    this.setState({
      showConfirmClear: false,
    });
  }

  render() {
    return (
      <div id="SessionMenu">
        <SelectSessionMenu value={this.props.selectedSession} onChange={(e) => this.handleChange(e)}>
          {this.props.sessions.map((session) => <option value={session.id} key={session.id}>{session.name}</option>)}
        </SelectSessionMenu>

        <SessionName
          type="text"
          onChange={(e) => this.handleSessionNameChange(e)}
          value={this.state.sessionName}
          onKeyUp={(e) => this.handleKeyUp(e)}
        />

        <SessionButton onClick={() => this.handleSessionCreation()}><i className="fa fa-plus" aria-hidden="true"></i></SessionButton>
        <SessionButton onClick={() => this.showDeleteModal()}><i className="fa fa-trash-o" aria-hidden="true"></i></SessionButton>
        <SessionButton onClick={() => this.showClearModal()}><i className="fa fa-square-o" aria-hidden="true"></i></SessionButton>
        <SessionButton onClick={() => this.handleSessionRename()}><i className="fa fa-pencil" aria-hidden="true"></i></SessionButton>

        <Modal
          isOpen={this.state.showConfirmDelete}
          contentLabel="Delete session"
          onRequestClose={() => this.hideDeleteModal()}
          style={ModalStyles}
        >
          <p>This will delete all solves in this session and the session itself. The action is not revertible.</p>
          <button onClick={() => this.handleSessionDeletion()}>Confirm</button>
          <button onClick={() => this.hideDeleteModal()}>Cancel</button>
        </Modal>

        <Modal
          isOpen={this.state.showConfirmClear}
          contentLabel="Clear session"
          onRequestClose={() => this.hideClearModal()}
          style={ModalStyles}
        >
          <p>This will delete all solves in this session. The action is not revertible.</p>
          <button onClick={() => this.handleSessionClear()}>Confirm</button>
          <button onClick={() => this.hideClearModal()}>Cancel</button>
        </Modal>
      </div>
    );
  }
}

export default SessionMenu;
