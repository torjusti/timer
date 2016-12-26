import { createSession } from '../actions';

const session = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        name: action.name,
        id: action.id,
      };

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

    default:
      return state;
  }
};

export const selectedSession = (state = 0, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return action.id;

    // Select the new session when it is created.
    case 'CREATE_SESSION':
      return action.id;

    default:
      return state;
  }
};
