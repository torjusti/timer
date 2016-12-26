import React from 'react';

class SessionMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      sessionName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSessionCreation = this.handleSessionCreation.bind(this);
    this.handleSessionNameChange = this.handleSessionNameChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.props.onSessionChange(parseInt(event.target.value, 10));
  }

  handleSessionNameChange(event) {
    this.setState({
      sessionName: event.target.value,
    });
  }

  handleSessionCreation() {
    if (this.state.sessionName) {
      this.props.onSessionCreate(this.state.sessionName);

      this.setState({
        sessionName: '',
      })
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
        <select value={this.props.selectedSession} onChange={this.handleChange}>
          {this.props.sessions.map((session) => <option value={session.id} key={session.id}>{session.name}</option>)}
        </select>

        <input type="text" onChange={this.handleSessionNameChange} value={this.state.sessionName} onKeyUp={this.handleKeyUp} />
        <button onClick={this.handleSessionCreation}>Create session</button>
      </div>
    );
  }
}

export default SessionMenu;
