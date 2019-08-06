import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SessionsButton from '../sessions/SessionsButton';
import ScramblerSelect from 'scrambles/ScramblerSelect';
import DrawerMenu from './DrawerMenu';

const Title = styled(Typography)`
  flex: 1;
  user-select: none;
`;

const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <DrawerMenu />

      <Title variant="h6" color="inherit">
        Timer
      </Title>

      <>
        <ScramblerSelect />
        <SessionsButton />
      </>
    </Toolbar>
  </AppBar>
);

export default Header;
