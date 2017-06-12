import React from 'react';
import styled from 'styled-components';
import { SidebarHeader } from './Sidebar';

const SolverWorker = require('worker!../utils/solvers.worker.js'); // eslint-disable-line

const SolverTitle = styled.span`
  font-style: italic;
`;

class Solvers extends React.Component {
  constructor() {
    super();

    // The solver is fast enough that we only need custom messages
    // while initializing, not between scrambles.
    this.state = {
      EOLine: 'Initializing...',
      Cross: 'Initializing...',
      XCross: 'Initializing...',
      scramble: '',
    };
  }

  componentWillMount() {
    this.solverWorker = new SolverWorker();

    this.solverWorker.onmessage = event => {
      const result = JSON.parse(event.data);

      if (result.scramble !== this.state.scramble) {
        this.setState({
          EOLine: result.EOLine,
          Cross: result.Cross,
          XCross: result.XCross,
          scramble: result.scramble,
        });
      }
    };
  }

  render() {
    // We only have custom solvers for 3x3 scrambles.
    if (this.props.selectedScrambler === '333') {
      return null;
    }

    this.solverWorker.postMessage(JSON.stringify({
      scramble: this.props.currentScramble,
    }));

    return (
      <div>
        <SidebarHeader>Solutions</SidebarHeader>
        <ul>
          <li><SolverTitle>EOLine:</SolverTitle> {this.state.EOLine}</li>
          <li><SolverTitle>Cross:</SolverTitle> {this.state.Cross}</li>
          <li><SolverTitle>XCross:</SolverTitle> {this.state.XCross}</li>
        </ul>
      </div>
    );
  }
}

export default Solvers;
