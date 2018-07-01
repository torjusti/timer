import React from 'react';
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
import AddIcon from '@material-ui/icons/Add';
import MoreVert from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { toggleSessionsDialog } from './actions';

const SessionItem = styled(ListItem)`
  background: ${props => props.selected ? '#FFF' : '#EEE'};
`;

const SessionsDialog = ({ handleClose, selectedSession, sessions, open }) => (
  <Dialog onClose={handleClose} open={open}>
    <DialogTitle>Select a session</DialogTitle>

    <div>
      <List>
        {sessions.map(session =>
          <SessionItem
            button
            onClick={() => handleClose(session.id)}
            key={session.id}
            className={classNames('selected', session.id === selectedSession)}
          >
            <ListItemText primary={session.name} />

            <ListItemSecondaryAction>
              <IconButton>
                <MoreVert />
              </IconButton>
            </ListItemSecondaryAction>
          </SessionItem>
        )}

        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>

          <ListItemText primary="Create session" />
        </ListItem>
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
    dispatch(toggleSessionsDialog(false));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionsDialog);
