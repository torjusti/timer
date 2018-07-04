import React from 'react';
import FileSaver from 'file-saver';

const downloadFile = text => {
  const blob = new Blob([text], {
    type: 'text/plain;charset=utf-8',
  });

  FileSaver.saveAs(blob, `TimerExport_${Date.now()}.txt`);
};

const ExportDataButton = ({ state }) => (
  <div>
    <button onClick={() => downloadFile(JSON.stringify(state))}>
      Download
    </button>
  </div>
);

export default ExportDataButton;
