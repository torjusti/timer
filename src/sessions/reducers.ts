import * as actions from './actions';
import { Action } from 'reducers';

const result = (state: actions.Result, action: Action): actions.Result => {
  switch (action.type) {
    case actions.SET_PENALTY:
      const { id, penalty } = action.payload;

      if (state === undefined || id !== state.id) {
        return state;
      }

      return {
        ...state,
        penalty,
      };

    default:
      return state;
  }
};

const results = (state: actions.Result[] = [], action: Action): actions.Result[] => {
  switch (action.type) {
    case actions.ADD_RESULT:
      return [action.payload, ...state];

    case actions.CLEAR_SESSION:
      return [];

    case actions.DELETE_RESULTS:
      return state.filter(r => action.payload.indexOf(r.id) < 0);

    case actions.SET_PENALTY:
      return state.map(r => result(r, action));

    default:
      return state;
  }
};

export interface SessionState {
  name: string;
  id: string;
  results: actions.Result[];
  scrambler: Scrambler;
  scramble?: string;
}

const session = (state: SessionState | undefined, action: Action ): SessionState | undefined => {
  if (action.type === actions.CREATE_SESSION) {
    return {
      ...action.payload,
      results: results(undefined, action),
    };
  }

  if (state === undefined) {
    return state;
  }

  switch (action.type) {
    case actions.RENAME_SESSION:
      return {
        ...state,
        name: action.payload.name,
      };

    case actions.SELECT_SCRAMBLER:
      return {
        ...state,
        scrambler: action.payload,
      };

    case actions.SET_SCRAMBLE:
      return {
        ...state,
        scramble: action.payload,
      };
    
    case actions.ADD_RESULT:
    case actions.CLEAR_SESSION:
    case actions.DELETE_RESULTS:
    case actions.SET_PENALTY:
      return {
        ...state,
        results: results(state.results, action),
      };

    default:
      return state;
  }
};

export const sessions = (
  state: SessionState[] = [],
  action: Action,
  selectedSession: string | undefined,
): SessionState[] => {
  switch (action.type) {
    case actions.CREATE_SESSION:
      return [...state, session(undefined, action) as SessionState];

    case actions.DELETE_SESSION:
      return state.filter(session => session.id !== action.payload);

    case actions.RENAME_SESSION:
      return state.map(s => {
        if (s.id !== action.payload.id) {
          return s;
        }

        return session(s, action) as SessionState;
      });

      case actions.SELECT_SCRAMBLER:
      case actions.SET_SCRAMBLE:
      case actions.ADD_RESULT:
      case actions.CLEAR_SESSION:
      case actions.DELETE_RESULTS:
      case actions.SET_PENALTY:
        return state.map(s => {
          if (s.id !== selectedSession) {
            return s;
          }
  
          return session(s, action) as SessionState;
        });
            
    default:
      return state;
  }
};

export const selectedSession = (
  state: string | undefined,
  action: Action,
  sessions: SessionState[],
): string | undefined => {
  switch (action.type) {
    case actions.SET_SESSION:
      return action.payload;

    case actions.CREATE_SESSION:
      // Select the newly created session.
      return sessions[sessions.length - 1].id;

    case actions.DELETE_SESSION:
      // Select the next session in the list, as the current session no longer exists.
      return sessions[sessions.length - 1].id;

    default:
      return state;
  }
};
