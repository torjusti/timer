import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@material-ui/core';
import { TimerAppState } from 'reducers';
import { setStoreData } from './actions';

const LoadDataButton: React.FC = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [fileData, setFileData] = useState<TimerAppState>();
  const [fileError, setFileError] = useState<string>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleConfirm = () => {
    if (fileData) {
      dispatch(setStoreData(fileData));
      setOpen(false);
      toast('Loaded data from export');
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const reader = new FileReader();
    
    reader.addEventListener('load', (event: any) => {
      const result = event.target.result;

      if (result) {
        try {
          const data = JSON.parse(event.target.result);

          // Perform some cursory validation of the data export to check that it originates from this timer.
          if (data.sessions && data.solutions) {
            setFileError(undefined);
            setFileData(data);
            return;
          }

          throw new Error('Loaded JSON data does not match a valid timer store.');
        } catch (error) {
          setFileError('The provided file is not valid.');
        }
      }
      
    });

    reader.readAsText(event.target.files[0]);
  };

  return (
    <>
      <div style={{ padding: 20 }}>
        <Typography variant="h5">
          Load data from export
        </Typography>

        <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
          Load data from a previous export. This will override all existing data.
        </Typography>

        <input type="file" onChange={handleFileChange} />

        <Button
          onClick={handleClickOpen}
          color="primary"
          variant="contained"
          style={{ marginLeft: 10 }}
          disabled={!fileData}
        >
          Load timer data from file
        </Button>

        {fileError && <p>{fileError}</p>}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">Confirm data import</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to load this data and override the currently stored timer data? This action can not be reversed.
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>

          <Button onClick={handleConfirm} color="secondary">
            Agree and override
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoadDataButton;
