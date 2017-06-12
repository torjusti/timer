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
      FirstBlock: 'Initializing...',
      scramble: '',
      sentScramble: '',
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
          FirstBlock: result.FirstBlock,
          scramble: result.scramble,
        });
      }
    };
  }

  componentDidMount() {
    this.solverWorker.postMessage(JSON.stringify({
      scramble: this.props.currentScramble,
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.sentScramble !== nextProps.scramble) {
      this.solverWorker.postMessage(JSON.stringify({
        scramble: nextProps.currentScramble,
      }));

      this.setState({
        sentScramble: nextProps.currentScramble,
      });
    }
  }

  render() {
    // We only have custom solvers for 3x3 scrambles.
    if (this.props.scrambler !== '333') {
      return null;
    }

    return (
      <div>
        <SidebarHeader>Solutions</SidebarHeader>
        <ul>
          <li><SolverTitle>EOLine:</SolverTitle> {this.state.EOLine}</li>
          <li><SolverTitle>Cross:</SolverTitle> {this.state.Cross}</li>
          <li><SolverTitle>XCross:</SolverTitle> {this.state.XCross}</li>
          <li><SolverTitle>FirstBlock:</SolverTitle> {this.state.FirstBlock}</li>
        </ul>
      </div>
    );
  }
}

export default Solvers;
