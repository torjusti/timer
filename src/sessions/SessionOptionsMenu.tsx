import React, { useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
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
import { renameSession, deleteSession, clearSession } from './actions';

interface SessionOptionsMenuProps {
  deletingEnabled: boolean;
  session: string;
}

const SessionOptionsMenu: React.FC<SessionOptionsMenuProps> = ({ session, deletingEnabled }) => {
  const dispatch = useDispatch();

  const [anchor, setAnchor] = useState();
  const [renameOpen, setRenameOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState<string>('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);

  const handleOpenRename = () => {
    setUpdatedName('');
    setRenameOpen(true);
    setAnchor(null);
  };

  const handleCloseRename = () => {
    setRenameOpen(false);
  };

  const handleRename = () => { 
    if (updatedName) {
      handleCloseRename();
      dispatch(renameSession(session, updatedName));
    }
  };

  const handleOpenDelete = () => {
    setAnchor(undefined);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const handleDelete = () => {
    handleCloseDelete();
    dispatch(deleteSession(session));
  }

  const handleOpenClear = () => {
    setAnchor(undefined);
    setClearOpen(true);
  };

  const handleCloseClear = () => {
    setClearOpen(false);
  };

  const handleClear = () => {
    handleCloseClear();
    dispatch(clearSession(session));
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleRename();
    }
  };

  return (
    <>
      <IconButton onClick={event => setAnchor(event.currentTarget)}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor( undefined )}
      >
        <MenuItem onClick={handleOpenRename}>Rename</MenuItem>

        <MenuItem onClick={handleOpenClear}>Clear</MenuItem>

        {deletingEnabled && (
          <MenuItem onClick={handleOpenDelete}>Delete</MenuItem>
        )}
      </Menu>

      <Dialog open={renameOpen} onClose={handleCloseRename}>
        <DialogTitle>Rename session</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please enter the new name for this session below.
          </DialogContentText>

          <TextField
            label="Session name"
            margin="dense"
            fullWidth
            value={updatedName}
            onChange={event => setUpdatedName( event.target.value )}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseRename} color="primary">
            Cancel
          </Button>

          <Button onClick={handleRename} color="primary" disabled={!updatedName}>
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Delete session</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you absolutely certain you want to delete this session, and
            all the results within it? This action is not reversible.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>

          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={clearOpen} onClose={handleCloseClear}>
        <DialogTitle>Clear session</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you absolutely certain you want to clear the contents of this
            session, deleting all the results within it? This action is not
            reversible.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseClear} color="primary">
            Cancel
          </Button>

          <Button onClick={handleClear} color="secondary">
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SessionOptionsMenu;
