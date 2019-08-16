import React from 'react';
import styled from 'styled-components';
import { DialogTitle, DialogContent, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { Result } from 'sessions/actions';
import { formatResult } from './utils';

const DialogScramble = styled(DialogContent)`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.8rem;
`;

interface Props {
  data: Result;
}

const FullResult: React.FC<Props> = ({ data }) => (
  <>
    <DialogTitle>{formatResult(data)}</DialogTitle>

    <DialogContent>
      <Paper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Scramble</TableCell>

              <TableCell>
                <DialogScramble>
                  <a
                    href={`https://alg.cubing.net/?setup=${data.scramble}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {data.scramble}
                  </a>
                </DialogScramble>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </DialogContent>
  </>
);

export default FullResult;
