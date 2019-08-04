import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import routes from './routes';

const MenuButton = styled(IconButton)`
  margin-left: -12px;
  margin-right: 20px;
`;

const DrawerLists = styled.div`
  width: 20rem;
`;

const DrawerMenu: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <MenuButton color="inherit" aria-label="Menu" onClick={() => setVisible(true)}>
        <MenuIcon />
      </MenuButton>

      <SwipeableDrawer
        open={visible}
        onClose={() => setVisible(false)}
        onOpen={() => setVisible(true)}
      >
        <div
          role="button"
          onClick={() => setVisible(false)}
          onKeyDown={() => setVisible(false)}
        >
          <DrawerLists>
            <List>
              <ListItem button component={Link} to={routes.home}>
                <ListItemText primary="Timer" />
              </ListItem>

              <ListItem button component={Link} to={routes.results}>
                <ListItemText primary="Results" />
              </ListItem>

              <ListItem button component={Link} to={routes.statistics}>
                <ListItemText primary="Statistics" />
              </ListItem>

              <ListItem button component={Link} to={routes.settings}>
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
          </DrawerLists>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default DrawerMenu;
