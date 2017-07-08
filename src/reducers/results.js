const result = (state = {}, action, scrambler, scramble) => {
  switch (action.type) {
    case 'ADD_RESULT':
      return {
        id: action.id,
        time: action.time,
        session: action.session,
        plusTwo: false,
        dnf: false,
        scrambler,
        scramble,
      };

    case "TOGGLE_PLUS_TWO":
      if (state.id !== action.id || state.session !== action.session) {
        return state;
      }

      return {
        ...state,
        plusTwo: !state.plusTwo,
      }

    case "TOGGLE_DNF":
      if (state.id !== action.id || state.session !== action.session) {
        return state;
      }

      return {
        ...state,
        dnf: !state.dnf,
      }

    default:
      return state;
  }
};

const results = (state = [], action, scrambler, scramble) => {
  switch (action.type) {
    case 'ADD_RESULT':
      return [
        ...state,
        result(undefined, action, scrambler, scramble),
      ];

    case 'CLEAR_SESSION':
      return state.filter((r) => r.session !== action.id);

    case "DELETE_RESULT":
      return state.filter((r) => r.id !== action.id);

    case "DELETE_RESULTS":
      return state.filter((r) => action.ids.indexOf(r.id) < 0);

    case "TOGGLE_PLUS_TWO":
      return state.map((r) => result(r, action));

    case "TOGGLE_DNF":
      return state.map((r) => result(r, action));

    default:
      return state;
  }
};

export default results;
