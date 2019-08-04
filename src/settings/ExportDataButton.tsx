import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
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
    <div style={{ padding: 10 }}>
      <Button onClick={() => downloadFile(JSON.stringify(state))} color="primary" variant="contained">
        Export timer data
      </Button>
    </div>
  );
};

export default ExportDataButton;
