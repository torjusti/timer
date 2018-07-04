import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { toggleSessionsDialog, setSession } from './actions';
import SessionOptionsMenu from './SessionOptionsMenu';
import CreateSessionDialog from './CreateSessionDialog';

const SessionItem = styled(ListItem)`
  &.selected {
    background: #f5f5f5;
  }
`;

const SessionsDialog = ({
  handleClose,
  handleSetSession,
  selectedSession,
  sessions,
  open,
  fullScreen,
}) => (
  <Dialog onClose={handleClose} open={open} fullScreen={fullScreen}>
    <DialogTitle>Select a session</DialogTitle>

    <div>
      <List>
        {sessions.map(session => (
          <SessionItem
            button
            onClick={() => handleSetSession(session.id)}
            key={session.id}
            className={classNames({ selected: session.id === selectedSession })}
          >
            <ListItemText primary={session.name} />

            <ListItemSecondaryAction>
              <SessionOptionsMenu session={session.id} />
            </ListItemSecondaryAction>
          </SessionItem>
        ))}

        <CreateSessionDialog />
      </List>
    </div>
  </Dialog>
);

const mapStateToProps = state => ({
  open: state.sessionsDialogVisibility,
  selectedSession: state.selectedSession,
  sessions: state.sessions,
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch(toggleSessionsDialog(false));
  },

  handleSetSession: selectedSession => {
    dispatch(toggleSessionsDialog(false));
    dispatch(setSession(selectedSession));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withMobileDialog()(SessionsDialog));
