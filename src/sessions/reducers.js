import { createSession } from 'sessions/actions';
import generateScramble from 'scrambles/generateScramble';
import results from 'results/reducers';
import { TOGGLE_SESSIONS_DIALOG } from './actions';

/**
 * The scrambler which is currently selected in the session.
 */
const selectedScrambler = (state = '333', action) => {
  switch (action.type) {
    case 'SELECT_SCRAMBLER':
      return action.scrambler;

    default:
      return state;
  }
};

/**
 * The latest scramble given by the selected scrambler in a session.
 */
const currentScramble = (state = generateScramble(333), action) => {
  switch (action.type) {
    case 'SET_SCRAMBLE':
      return action.scramble;

    default:
      return state;
  }
};

const session = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        name: action.name,
        id: action.id,
        results: [],
        selectedScrambler: selectedScrambler(undefined, action),
        currentScramble: currentScramble(undefined, action),
      };

    case 'RENAME_SESSION':
      return {
        ...state,
        name: action.name,
      };

    case 'SELECT_SCRAMBLER':
      return {
        ...state,
        selectedScrambler: selectedScrambler(state.selectedScrambler, action),
      };

    case 'SET_SCRAMBLE':
      return {
        ...state,
        currentScramble: currentScramble(state.currentScramble, action),
      };

    case 'ADD_RESULT':
    case 'CLEAR_SESSION':
    case 'DELETE_RESULT':
    case 'SET_PENALTY':
      return {
        ...state,
        results: results(
          state.results,
          action,
          state.selectedScrambler,
          state.currentScramble,
        ),
      };

    default:
      return state;
  }
};

// We need to store the default session in order to use its ID in the
// value for default selectedSession.
const defaultSession = session(undefined, createSession('Default session'));

const defaultSessions = [defaultSession];

export const sessions = (state = defaultSessions, action, selectedSession) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return [...state, session(undefined, action)];

    case 'DELETE_SESSION':
      return state.filter(session => session.id !== action.id);

    case 'RENAME_SESSION':
      return state.map(s => {
        if (s.id !== action.id) {
          return s;
        }

        return session(s, action);
      });

    case 'SELECT_SCRAMBLER':
    case 'SET_SCRAMBLE':
    case 'ADD_RESULT':
    case 'CLEAR_SESSION':
    case 'DELETE_RESULT':
    case 'SET_PENALTY':
      return state.map(s => {
        if (s.id !== selectedSession) {
        }

        return session(s, action);
      });

    default:
      return state;
  }
};

export const selectedSession = (
  state = defaultSession.id,
  action,
  sessions,
) => {
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

export const sessionsDialogVisibility = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SESSIONS_DIALOG:
      return action.visible;

    default:
      return state;
  }
};
