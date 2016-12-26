const result = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_RESULT':
      return {
        id: action.id,
        time: action.time,
        session: action.session,
        plusTwo: false,
      };

    case "TOGGLE_PLUS_TWO":
      if (state.id !== action.id || state.session !== action.session) {
        return state;
      }

      return {
        ...state,
        plusTwo: !state.plusTwo,
      }

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
      return state.filter((r) => r.session !== action.session || r.id !== action.id);

    case "TOGGLE_PLUS_TWO":
      return state.map((r) => result(r, action));

    default:
      return state;
  }
};

export default results;
