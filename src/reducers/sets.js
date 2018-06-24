import { defaultCard } from '../utils/spacedRepetition';

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
            ...defaultCard,
            algorithm: action.algorithm,
            id: action.id,
          },
        ],
      };

    case 'GRADE_ALGORITHM':
      return {
        ...state,

        algorithms: state.algorithms.map((alg) => {
          if (alg.id !== action.id) {
            return alg;
          }

          return {
            ...alg,
            ...action.data,
          };
        }),
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
          obj[key] = set(state[key], action);
          return obj;
        }, {});

    case 'GRADE_ALGORITHM':
      return Object.keys(state)
        .reduce((obj, key) => {
          obj[key] = set(state[key], action);
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

export const currentAlgorithm = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ALGORITHM':
      return action.id;

    default:
      return state;
  }
};
