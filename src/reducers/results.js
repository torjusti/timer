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

    case 'CLEAR_SESSION':
      return state.filter((r) => r.session !== action.id);

    case "DELETE_RESULT":
      return state.filter((r) => r.session !== action.session && r.id !== action.id);

    default:
      return state;
  }
};

export default results;
