import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import FileSaver from 'file-saver';
import { TimerAppState } from 'reducers';

const downloadFile = (text: string) => {
  const blob = new Blob([text], {
    type: 'text/plain;charset=utf-8',
  });

  FileSaver.saveAs(blob, `timer-data-${Date.now()}.txt`);
};

const ExportDataButton: React.FC = () => {
  const state = useSelector((state: TimerAppState) => state);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5">
        Export data to file
      </Typography>

      <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
        Export a backup of your timer data as a file.
      </Typography>

      <Button onClick={() => downloadFile(JSON.stringify(state))} color="primary" variant="contained">
        Export timer data
      </Button>
    </div>
  );
};

export default ExportDataButton;
