import React from 'react';
import styled from 'styled-components';

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

class SessionMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      sessionName: '',
    };
  }

  handleChange(event) {
    this.props.onSessionChange(parseInt(event.target.value, 10));
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
  }

  // Attempt creating session when enter is pressed.
  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.handleSessionCreation();
    }
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
        <SessionButton onClick={() => this.handleSessionDeletion()}><i className="fa fa-trash-o" aria-hidden="true"></i></SessionButton>
        <SessionButton onClick={() => this.handleSessionClear()}><i className="fa fa-square-o" aria-hidden="true"></i></SessionButton>
        <SessionButton onClick={() => this.handleSessionRename()}><i className="fa fa-pencil" aria-hidden="true"></i></SessionButton>
      </div>
    );
  }
}

export default SessionMenu;
