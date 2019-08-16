import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { Location } from 'history';
import SessionsButton from '../sessions/SessionsButton';
import ScramblerSelect from 'scrambles/ScramblerSelect';
import DrawerMenu from './DrawerMenu';
import routes from './routes';

const Title = styled(Typography)`
  flex: 1;

  @media (max-width: 800px) {
    user-select: none;
  }
`;

interface Props {
  location: Location<any>;
}

const Header: React.FC<Props> = ({ location }) => {
  const isHomeRoute = location.pathname === routes.home;
  
  return (
    <AppBar position="static">
      <Toolbar>
        <DrawerMenu />

        <Title variant="h6" color="inherit">
          Timer
        </Title>

        {isHomeRoute && (
          <ScramblerSelect />
        )}

        <SessionsButton />
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
