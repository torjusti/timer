import { Penalties, ADD_RESULT, SET_PENALTY, DELETE_RESULT } from './actions';
import { CLEAR_SESSION } from 'sessions/actions';

const result = (state = {}, action, scrambler, scramble) => {
  switch (action.type) {
    case ADD_RESULT:
      return {
        id: action.id,
        time: action.time,
        penalty: Penalties.NONE,
        scrambler,
        scramble,
      };

    case SET_PENALTY:
      if (action.id !== state.id) {
        return state;
      }

      return {
        ...state,
        penalty: action.penalty,
      };

    default:
      return state;
  }
};

const results = (state = [], action, scrambler, scramble) => {
  switch (action.type) {
    case ADD_RESULT:
      return [
        ...state,
        result(undefined, action, scrambler, scramble),
      ];

    case CLEAR_SESSION:
      return [];

    case DELETE_RESULT:
      return state.filter((r) => action.ids.indexOf(r.id) < 0);

    case SET_PENALTY:
      return state.map(r => result(r, action));

    default:
      return state;
  }
};

export default results;
