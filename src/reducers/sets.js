const set = (state = {}, action) => {
  switch(action.type) {
    case 'CREATE_SET':
      return {
        id: action.id,
        name: action.name,
        algorithms: [],
      };

    case 'ADD_ALGORITHM':
      if (state.id !== action.set) {
        return state;
      }

      return {
        ...state,
        algorithms: [
          ...state.algorithms,

          {
            algorithm: action.algorithm,
            id: action.id,
          },
        ],
      };
    default:
      return state;
  }
};

export const sets = (state = {}, action) => {
  switch(action.type) {
    case 'CREATE_SET':
      return {
        ...state,
        [action.id]: set(undefined, action),
      };

    case 'ADD_ALGORITHM':
      return {
        ...state,
        [action.set]: set(state[action.set], action),
      }

    case 'DELETE_SET':
      return Object.keys(state)
        .filter((key) => key !== action.id)
        .reduce((obj, key) => {
          obj[key] = JSON.parse(JSON.stringify(state[key]));
          return obj;
        }, {});

    default:
      return state;
  }
};

export const selectedSet = (state = null, action) => {
  switch(action.type) {
    case 'CREATE_SET':
      return action.id;

    case 'SELECT_SET':
      return action.id;

    case 'DELETE_SET':
      return null;

    default:
      return state;
  }
};
