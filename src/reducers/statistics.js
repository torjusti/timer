import { SHOW_RECORD_MESSAGE, HIDE_RECORD_MESSAGE } from '../actions/statistics';

const recordMessageIsVisible = (state = false, action) => {
  switch (action.type) {
    case  SHOW_RECORD_MESSAGE:
      return true;

    case HIDE_RECORD_MESSAGE:
      return false;

    default:
      return state;
  }
};

export default recordMessageIsVisible;