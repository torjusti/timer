import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { toggleDrawer } from './actions';
import { toggleSessionsDialog } from 'sessions/actions';

const MenuButton = styled(IconButton)`
  margin-left: -12px;
  margn-right: 20px;
`;

const Title = styled(Typography)`
  flex: 1;
`;

const Header = ({ showDrawer, showSessionsDialog }) => (
  <AppBar>
    <Toolbar>
      <MenuButton color="inherit" aria-label="Menu" onClick={showDrawer}>
        <MenuIcon />
      </MenuButton>

      <Title variant="title" color="inherit">
        Timer
      </Title>

      <Button color="inherit" onClick={showSessionsDialog}>Sessions</Button>
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

export default connect(
  undefined,
  mapDispatchToProps,
)(Header);
