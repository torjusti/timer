import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectedScramblerSelector } from 'sessions/selectors';
import { useSelector } from 'react-redux';
import { TimerAppState } from 'reducers';

const SolverPaper = styled(Paper)`
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  width: 80%;
  // We unfortunately disable selecting, as enabling selection on this
  // element seems to break touch timer starting on mobile.
  user-select: none;
`;

const Solution = styled(TableCell)`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
`;

const ProgressContainer = styled.div`
  margin: 1rem;
`;

const Solvers: React.FC = () => {
  const scrambler = useSelector(selectedScramblerSelector);
  const solutions = useSelector((state: TimerAppState) => state.solutions);

  if (scrambler !== '333') {
    return null;
  }

  if (solutions === undefined) {
    return (
      <SolverPaper>
        <ProgressContainer>
          <CircularProgress />
        </ProgressContainer>
      </SolverPaper>
    );
  }

  return (
    <SolverPaper>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>EOLine</TableCell>
            <Solution>{solutions.eoline}</Solution>
          </TableRow>

          <TableRow>
            <TableCell>Cross</TableCell>
            <Solution>{solutions.cross}</Solution>
          </TableRow>

          <TableRow>
            <TableCell>First block</TableCell>
            <Solution>{solutions.fb}</Solution>
          </TableRow>

          <TableRow>
            <TableCell>XCross</TableCell>
            <Solution>{solutions.xcross}</Solution>
          </TableRow>
        </TableBody>
      </Table>
    </SolverPaper>
  );
};

export default Solvers;
