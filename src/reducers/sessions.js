import { createSession } from '../actions';

const session = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        name: action.name,
        id: action.id,
      };

    case 'RENAME_SESSION':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        name: action.name,
      }

    default:
      return state;
  }
};

const defaultSessions = [
  session(undefined, createSession('Default session')),
];

export const sessions = (state = defaultSessions, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return [
        ...state,
        session(undefined, action),
      ];

    case 'DELETE_SESSION':
      return state.filter((session) => session.id !== action.id);

    case 'RENAME_SESSION':
      return state.map((s) => session(s, action));

    default:
      return state;
  }
};

export const selectedSession = (state = 0, action, sessions) => {
  switch (action.type) {
    case 'SET_SESSION':
      return action.id;

    case 'CREATE_SESSION':
      return sessions[sessions.length - 1].id;

    case 'DELETE_SESSION':
      return state - 1;

    default:
      return state;
  }
};
