import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScramblerSelect from 'scrambles/ScramblerSelect';
import { toggleDrawer } from './actions';
import { toggleSessionsDialog } from 'sessions/actions';
import routes from 'routes';

const MenuButton = styled(IconButton)`
  margin-left: -12px;
  margn-right: 20px;
`;

const Title = styled(Typography)`
  flex: 1;
`;

const Header = ({ showDrawer, showSessionsDialog, location }) => (
  <AppBar position="static">
    <Toolbar>
      <MenuButton color="inherit" aria-label="Menu" onClick={showDrawer}>
        <MenuIcon />
      </MenuButton>

      <Title variant="h6" color="inherit">
        Timer
      </Title>

      {console.log(location, routes, location.pathname, routes.home)}
      {location.pathname === routes.home && (
        <Fragment>
          <ScramblerSelect />

          <Button color="inherit" onClick={showSessionsDialog}>
            Sessions
          </Button>
        </Fragment>
      )}
    </Toolbar>
  </AppBar>
);

const mapDispatchToProps = dispatch => ({
  showDrawer: () => {
    dispatch(toggleDrawer(true));
  },

  showSessionsDialog: () => {
    dispatch(toggleSessionsDialog(true));
  },
});

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps,
  )(Header),
);
