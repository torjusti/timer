import { TOGGLE_DRAWER } from './actions';

const drawerVisible = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return action.visible;

    default:
      return state;
  }
};

export default drawerVisible;
