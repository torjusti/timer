import { combineReducers } from 'redux';

const result = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RESULT':
      return {
        id: action.id,
        time: action.time,
      };

    default:
      return state;
  }
};

const results = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RESULT':
      return [
        ...state,
        result(undefined, action),
      ];

    default:
      return state;
  }
};

const timerApp =  combineReducers({
  results,
});

export default timerApp;
