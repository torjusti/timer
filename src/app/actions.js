export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

/**
 * Sets the state of the drawer menu.
 */
export const toggleDrawer = visible => ({
  type: TOGGLE_DRAWER,
  visible,
});
