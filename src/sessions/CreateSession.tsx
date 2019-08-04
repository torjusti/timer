import React, { useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
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
import { createSession } from './actions';

const CreateSession: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setName(undefined);
    setOpen(false);
  };

  const handleCreateSession = (): void => {
    if (name) {
      dispatch(createSession(name));
      handleClose();
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleCreateSession();
    }
  }

  return (
    <>
      <ListItem button onClick={handleOpen}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>

        <ListItemText primary="Create session" />
      </ListItem>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create session</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please enter the name for the session below.
          </DialogContentText>

          <TextField
            label="Session name"
            fullWidth
            value={name}
            onChange={event => setName( event.target.value )}
            onKeyPress={handleKeyPress}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={handleCreateSession} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateSession;
