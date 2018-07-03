import React from 'react';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SolverWorker from 'worker-loader!./worker'; // eslint-disable-line

const SolverPanel = styled(ExpansionPanel)`
  margin: 0 2rem 2rem 2rem;
`;

const SolverPaper = styled(Paper)`
  width: 100%;
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
      <SolverPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Show solutions</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
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
        </ExpansionPanelDetails>
      </SolverPanel>
    );
  }
}

export default Solvers;
