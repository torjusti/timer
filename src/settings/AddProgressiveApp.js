import React, { Component } from 'react';

class AddProgressiveApp extends Component {
  state = {
    event: null,
  };

  handleBeforeInstallPrompt = event => {
    event.preventDefault();

    this.setState({
      event,
    });
  };

  componentDidMount() {
    window.addEventListener(
      'beforeinstallprompt',
      this.handleBeforeInstallPrompt,
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeinstallprompt',
      this.handleBeforeInstallPrompt,
    );
  }

  handleClick = () => {
    this.state.event.prompt();
  };

  render() {
    return (
      <button disabled={!this.state.event} onClick={this.handleClick}>
        Save application to home screen
      </button>
    );
  }
}

export default AddProgressiveApp;
