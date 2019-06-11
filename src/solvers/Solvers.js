import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SolverWorker from './solver.worker'; // eslint-disable-line

console.log(SolverWorker);

const SolverPaper = styled(Paper)`
  width: 80%;
  margin: 1rem auto;
`;

const Solution = styled(TableCell)`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
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

    console.log(this.solverWorker);

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
      console.log('sending message');
      this.solverWorker.postMessage(
        JSON.stringify({
          scramble: this.props.currentScramble,
        }),
      );
      console.log('message sent');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.sentScramble !== nextProps.scramble) {
      this.solverWorker.postMessage(
        JSON.stringify({
          scramble: nextProps.currentScramble,
        }),
      );

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
      <SolverPaper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>EOLine</TableCell>
              <Solution>{this.state.EOLine}</Solution>
            </TableRow>

            <TableRow>
              <TableCell>Cross</TableCell>
              <Solution>{this.state.Cross}</Solution>
            </TableRow>

            <TableRow>
              <TableCell>First block</TableCell>
              <Solution>{this.state.FirstBlock}</Solution>
            </TableRow>
          </TableBody>
        </Table>
      </SolverPaper>
    );
  }
}

export default Solvers;
