import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import { createSession } from './actions';

class SessionOptionsMenu extends Component {
  state = {
    open: false,
    name: '',
  };

  handleOpen = () => {
    this.setState({
      open: true,
      name: '',
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    })
  };

  handleCreateSession = () => {
    this.handleClose();
    this.props.createSession(this.state.name);
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleCreateSession();
    }
  };

  render() {
    return (
      <div>
        <ListItem button onClick={this.handleOpen}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>

          <ListItemText primary="Create session" />
        </ListItem>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Create session</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please enter the name for the session below.
            </DialogContentText>

            <TextField
              margin="dense"
              label="Session name"
              fullWidth
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              onKeyPress={this.handleKeyPress}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>

            <Button onClick={this.handleRename} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createSession: name => {
    dispatch(createSession(name));
  },
});

export default connect(
  undefined,
  mapDispatchToProps,
)(SessionOptionsMenu);
