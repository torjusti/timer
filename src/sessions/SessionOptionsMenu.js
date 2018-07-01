import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { renameSession, deleteSession } from './actions';

class SessionOptionsMenu extends Component {
  state = {
    anchor: null,
    renameOpen: false,
    updatedName: '',
    deleteOpen: false,
  };

  handleOpenRename = () => {
    this.setState({
      updatedName: '',
      renameOpen: true,
      anchor: null,
    });
  };

  handleCloseRename = () => {
    this.setState({
      renameOpen: false,
    })
  };

  handleRename = () => {
    this.handleCloseRename();
    this.props.renameSession(this.props.session, this.state.updatedName);
  };

  handleOpenDelete = () => {
    this.setState({
      anchor: null,
      deleteOpen: true,
    });
  };

  handleCloseDelete = () => {
    this.setState({
      deleteOpen: false,
    });
  };

  handleDelete = () => {
    this.setState({
      deleteOpen: false,
    });

    this.props.deleteSession(this.props.session);
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleRename();
    }
  };

  render() {
    return (
      <div>
        <IconButton onClick={event => this.setState({ anchor: event.currentTarget })}>
          <MoreVert />
        </IconButton>

        <Menu
          anchorEl={this.state.anchor}
          open={Boolean(this.state.anchor)}
          onClose={() => this.setState({ anchor: null })}
        >
          <MenuItem onClick={this.handleOpenRename}>Rename</MenuItem>

          {this.props.deletingEnabled &&
            <MenuItem onClick={this.handleOpenDelete}>Delete</MenuItem>}
        </Menu>

        <Dialog
          open={this.state.renameOpen}
          onClose={this.handleCloseRename}
        >
          <DialogTitle>Rename session</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please enter the new name for this session below.
            </DialogContentText>

            <TextField
              margin="dense"
              label="Session name"
              fullWidth
              value={this.state.updatedName}
              onChange={event => this.setState({ updatedName: event.target.value })}
              onKeyPress={this.handleKeyPress}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleCloseRename} color="primary">
              Cancel
            </Button>

            <Button onClick={this.handleRename} color="primary">
              Rename
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.deleteOpen}
          onClose={this.handleCloseDelete}
        >
          <DialogTitle>Delete session</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Are you absolutely certain you want to delete this session, and all the results
              within it? This action is not reversible.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleCloseDelete} color="primary">
              Cancel
            </Button>

            <Button onClick={this.handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // We do not allow deleting the last session.
  deletingEnabled: state.sessions.length > 1,
});

const mapDispatchToProps = dispatch => ({
  renameSession: (id, name) => {
    dispatch(renameSession(id, name));
  },

  deleteSession: id => {
    dispatch(deleteSession(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionOptionsMenu);
