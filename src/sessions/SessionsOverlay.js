import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { toggleSessionsDialog, setSession } from './actions';
import SessionOptionsMenu from './SessionOptionsMenu';
import CreateSessionDialog from './CreateSessionDialog';

const SessionItem = styled(ListItem)`
  &.selected {
    background: #F5F5F5;
  }
`;

const SessionsDialog = ({ handleClose, selectedSession, sessions, open, fullScreen }) => (
  <Dialog onClose={handleClose} open={open} fullScreen={fullScreen}>
    <DialogTitle>Select a session</DialogTitle>

    <div>
      <List>
        {sessions.map(session =>
          <SessionItem
            button
            onClick={() => handleClose(session.id)}
            key={session.id}
            className={classNames({ 'selected': session.id === selectedSession })}
          >
            <ListItemText primary={session.name} />

            <ListItemSecondaryAction>
              <SessionOptionsMenu session={session.id} />
            </ListItemSecondaryAction>
          </SessionItem>
        )}

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
  handleClose: selectedSession => {
    console.log(selectedSession)
    dispatch(toggleSessionsDialog(false));
    dispatch(setSession(selectedSession));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withMobileDialog()(SessionsDialog));
