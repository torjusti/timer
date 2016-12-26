const result = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RESULT':
      return {
        id: action.id,
        time: action.time,
        session: action.session,
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

export default results;
