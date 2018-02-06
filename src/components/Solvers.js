import React from 'react';
import styled from 'styled-components';

const SolverWorker = require('worker!../utils/solvers.worker.js'); // eslint-disable-line

const SolverTitle = styled.span`

`;

const SolverList = styled.ul`
  padding: 0;
  list-style-position: inside;
  list-style: none;
  font-family: monospace;
`;

const Solution = styled.span`
  font-family: monospace;
`;

class Solvers extends React.Component {
  constructor() {
    super();

    // The solver is fast enough for us to only need custom messages
    // while initializing, not between scrambles.
    this.state = {
      EOLine: 'Initializing...',
      Cross: 'Initializing...',
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
          FirstBlock: result.FirstBlock,
          scramble: result.scramble,
        });
      }
    };
  }

  componentDidMount() {
    if (this.props.scrambler === '333') {
      this.solverWorker.postMessage(JSON.stringify({
        scramble: this.props.currentScramble,
      }));
    }
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
      <SolverList>
        <li><SolverTitle>EOLine:</SolverTitle> <Solution>{this.state.EOLine}</Solution></li>
        <li><SolverTitle>Cross:</SolverTitle> <Solution>{this.state.Cross}</Solution></li>
        <li><SolverTitle>FB:</SolverTitle> <Solution>{this.state.FirstBlock}</Solution></li>
      </SolverList>
    );
  }
}

export default Solvers;
