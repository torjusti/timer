import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { setSession } from './actions';
import SessionOptionsMenu from './SessionOptionsMenu';
import CreateSession from './CreateSession';
import { TimerAppState } from '../reducers';

const SessionItem = styled(ListItem)`
  background: ${({ selected }) => selected && '#f5f5f5'};
`;

interface SettingsDialogProps {
  onClose: () => void;
  open: boolean;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onClose, open }) => {
  const dispatch = useDispatch();

  const selectedSession = useSelector((state: TimerAppState) => state.selectedSession);
  const sessions = useSelector((state: TimerAppState) => state.sessions);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Select a session</DialogTitle>

      <List>
        {sessions.map(session => (
          <SessionItem
            button
            onClick={() => dispatch(setSession(session.id))}
            key={session.id}
            selected={session.id === selectedSession}
          >
            <ListItemText primary={session.name} />

            <ListItemSecondaryAction>
              <SessionOptionsMenu session={session.id} deletingEnabled={sessions.length > 1} />
            </ListItemSecondaryAction>
          </SessionItem>
        ))}

        <CreateSession />
      </List>
    </Dialog>
  );
};

export default SettingsDialog;
