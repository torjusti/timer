import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import SessionsOverlay from './SessionsOverlay';
import { useSelector } from 'react-redux';
import { selectedSessionSelector } from './selectors';

const StyledButton = styled(Button)`
  text-transform: none;
  margin-left: 1rem;

  &:focus {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const SessionsButton: React.FC = () => {
  const selectedSession = useSelector(selectedSessionSelector);

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <StyledButton color="inherit" onClick={() => setVisible(true)}>
        {selectedSession && selectedSession.name}
      </StyledButton>

      <SessionsOverlay onClose={() => setVisible(false)} open={visible} />
    </>
  );
};

export default SessionsButton;
