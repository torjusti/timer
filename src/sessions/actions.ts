
import uuidv4 from 'uuid/v4';
import { CubingStatistics } from 'statistics/cubingStatistics';

export const SELECT_SCRAMBLER = 'SELECT_SCRAMBLER';
export const SET_SCRAMBLE = 'SET_SCRAMBLE';
export const CREATE_SESSION = 'CREATE_SESSION';
export const RENAME_SESSION = 'RENAME_SESSION';
export const DELETE_SESSION = 'DELETE_SESSION';
export const CLEAR_SESSION = 'CLEAR_SESSION';
export const SET_SESSION = 'SET_SESSION';
export const ADD_RESULT = 'ADD_RESULT';
export const SET_PENALTY = 'SET_PENALTY';
export const DELETE_RESULTS = 'DELETE_RESULTS';
export const SET_STATISTICS = 'SET_STATISTICS';

export interface SelectScramblerAction {
  type: typeof SELECT_SCRAMBLER;
  payload: string;
}

export const selectScrambler = (scrambler: string): SelectScramblerAction => ({
  type: SELECT_SCRAMBLER,
  payload: scrambler,
});

export interface SetScrambleAction {
  type: typeof SET_SCRAMBLE;
  payload: string;
}

export const setScramble = (scramble: string): SetScrambleAction => ({
  type: SET_SCRAMBLE,
  payload: scramble,
});

export interface CreateSessionAction {
  type: typeof CREATE_SESSION;

  payload: {
    name: string;
    scrambler: string;
    id: string;
  };
}

export const createSession = (name: string, scrambler: string = '333'): CreateSessionAction => ({
  type: CREATE_SESSION,

  payload: {
    id: uuidv4(),
    scrambler,
    name,
  },
});

export interface RenameSessionAction {
  type: typeof RENAME_SESSION;

  payload: {
    id: string;
    name: string;
  };
}

export const renameSession = (id: string, name: string): RenameSessionAction => ({
  type: RENAME_SESSION,
  payload: { id, name },
});

export interface DeleteSessionAction {
  type: typeof DELETE_SESSION;
  payload: string;
}

export const deleteSession = (id: string) => ({
  type: DELETE_SESSION,
  payload: id,
});

export interface ClearSessionAction {
  type: typeof CLEAR_SESSION;
  payload: { id: string; };
}

export const clearSession = (id: string): ClearSessionAction => ({
  type: CLEAR_SESSION,
  payload: { id },
});

export interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: string;
}

export const setSession = (session: string) => ({
  type: SET_SESSION,
  payload: session,
});

export enum Penalty {
  PLUS_TWO,
  DNF,
}

export interface Result {
  time: number;
  id: string;
  penalty?: Penalty;
  scramble: string;
}

export interface AddResultAction {
  type: typeof ADD_RESULT;
  payload: Result;
}

export const addResult = (time: number, scramble: string, penalty?: Penalty): AddResultAction => ({
  type: ADD_RESULT,

  payload: {
    id: uuidv4(),
    scramble,
    time,
    penalty,
  },
});

export interface SetPenaltyAction {
  type: typeof SET_PENALTY;

  payload: {
    id: string;
    penalty: Penalty | undefined;
  };
}

export const setPenalty = (id: string, penalty: Penalty | undefined) => ({
  type: SET_PENALTY,
  payload: { id, penalty },
});

export interface DeleteResultsAction {
  type: typeof DELETE_RESULTS;
  payload: string[];
}

export const deleteResults = (id: string[]) => ({
  type: DELETE_RESULTS,
  payload: id,
});

export interface SetStatisticsAction { 
  type: typeof SET_STATISTICS;
  
  payload: {
    id: string;
    statistics: Partial<CubingStatistics>;
  };
}

/* 
 * Used to asynchronously update statistics for a given session.
 */
export const setStatistics = (id: string, statistics: Partial<CubingStatistics>) => ({
  type: SET_STATISTICS,
  payload: { id, statistics },
});

export type SessionAction = SelectScramblerAction | SetScrambleAction
  | CreateSessionAction | RenameSessionAction | ClearSessionAction
  | AddResultAction | SetPenaltyAction | DeleteResultsAction
  | DeleteSessionAction | SetSessionAction | SetStatisticsAction;
