import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SessionsOverlay from './SessionsOverlay';

const SessionsButton: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button color="inherit" onClick={() => setVisible(true)}>
        Sessions
      </Button>

      <SessionsOverlay onClose={() => setVisible(false)} open={visible} />
    </>
  );
};

export default SessionsButton;
