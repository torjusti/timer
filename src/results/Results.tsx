
import React, { useState } from 'react';
import styled from 'styled-components';
import Portal from '@material-ui/core/Portal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withMobileDialog, { WithMobileDialog } from '@material-ui/core/withMobileDialog';
import { Penalty, deleteResults, setPenalty } from 'sessions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { AutoSizer, List as VirtualizedList } from 'react-virtualized';
import FullResult from './FullResult';
import { resultsSelector } from './selectors';
import { formatResult } from './utils';

const FloatingFab = styled(Fab)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;

const ResultListPaper = styled(Paper)`
  margin: 2rem;
  flex: 1;
`;

const PenaltyItem = styled(MenuItem)`
  background: ${({ selected }) => selected && '#f5f5f5'};
`;

const NoDataMessage = styled(Typography)`
  padding: 1rem;
`;

const Results: React.FC<WithMobileDialog> = ({ fullScreen }) => {
  const dispatch = useDispatch();

  const [currentResult, setCurrentResult] = useState<string>();
  const [checked, setChecked] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement>();

  const results = useSelector(resultsSelector);

  const handleToggle = (id: string) => {
    const index = checked.indexOf(id);
    const updated = [...checked];

    if (index >= 0) {
      updated.splice(index, 1);
    } else {
      updated.push(id);
    }
    
    setChecked(updated);
  };

  const handleOpen = (result: string) => {
    setCurrentResult(result);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteResults(checked));
    setChecked([]);
  };

  const currentResultData = currentResult && results &&
    results.find(result => result.id === currentResult);

  const rowRenderer = ({ key, index, style }: any) => {
    if (!results) {
      return null;
    }

    const result = results[index];
    
    return (
      <div style={style} key={result.id}>
        <ListItem
          dense
          button
          onClick={() => handleToggle(result.id)}
        >
          <Checkbox
            checked={checked.includes(result.id)}
            disableRipple
          />

          <ListItemText primary={formatResult(result)} />

          <ListItemSecondaryAction>
            <IconButton onClick={() => handleOpen(result.id)}>
              <SettingsIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  };

  return (
    <>
      <ResultListPaper>
        {results && results.length === 0 && (
          <NoDataMessage component="p">
            There are no results in this session. Go do some solves!
          </NoDataMessage>
        )}

        <List style={{ height: '100%' }}>
          {results && (
            <AutoSizer>
              {({ height, width }) => (
                <VirtualizedList
                  rowHeight={50}
                  width={width}
                  height={height}
                  rowCount={results.length}
                  rowRenderer={rowRenderer}
                />
              )}
            </AutoSizer>
          )}
        </List>
      </ResultListPaper>

      <Portal>
        <FloatingFab
          disabled={checked.length === 0}
          onClick={handleDelete}
          color="secondary"
          variant="round"
        >
          <DeleteIcon />
        </FloatingFab>
      </Portal>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth="xl"
      >
        {currentResultData && (
          <FullResult data={currentResultData} />
        )}

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>

          <Button onClick={event => setAnchor(event.currentTarget)}>
            Penalty
          </Button>
        </DialogActions>
      </Dialog>

      {currentResultData && (
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(undefined)}
        >
          <PenaltyItem
            onClick={() => dispatch(setPenalty(currentResultData.id, undefined))}
            selected={!currentResultData.penalty}
          >
            None
          </PenaltyItem>

          <PenaltyItem
            onClick={() => dispatch(setPenalty(currentResultData.id, Penalty.PLUS_TWO))}
            selected={currentResultData.penalty === Penalty.PLUS_TWO}
          >
            + 2
          </PenaltyItem>8

          <PenaltyItem
            onClick={() => dispatch(setPenalty(currentResultData.id, Penalty.DNF))}
            selected={currentResultData.penalty === Penalty.DNF}
          >
            DNF
          </PenaltyItem>
        </Menu>
      )}
    </>
  );
};

export default withMobileDialog()(Results);
