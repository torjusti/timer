import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { toggleDrawer } from './actions';
import routes from 'routes';

const DrawerLists = styled.div`
  width: 20rem;
`;

const Drawer = ({ visible, toggleDrawer }) => (
  <div>
    <SwipeableDrawer
      open={visible}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        <DrawerLists>
          <List>
            <ListItem button component={Link} to={routes.home}>
              <ListItemText primary="Timer" />
            </ListItem>

            <ListItem button component={Link} to={routes.algorithms}>
              <ListItemText primary="Algorithms" />
            </ListItem>

            <ListItem button component={Link} to={routes.settings}>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </DrawerLists>
      </div>
    </SwipeableDrawer>
  </div>
);

const mapStateToProps = state => ({
  visible: state.drawerVisible,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: visible => {
    dispatch(toggleDrawer(visible));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);
