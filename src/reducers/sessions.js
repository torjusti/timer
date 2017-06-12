import { createSession } from '../actions/sessions';

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

// We need to store the default session in order to use its ID in the
// value for default selectedSession.
const defaultSession = session(undefined, createSession('Default session'));

const defaultSessions = [defaultSession];

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

export const selectedSession = (state = defaultSession.id, action, sessions) => {
  switch (action.type) {
    case 'SET_SESSION':
      return action.id;

    case 'CREATE_SESSION':
      return sessions[sessions.length - 1].id;

    case 'DELETE_SESSION':
      return sessions[sessions.length - 1].id;

    default:
      return state;
  }
};
