import { TimerAppState } from 'reducers';

export const SET_STORE_DATA = 'SET_STORE_DATA';

export interface SetStoreDataAction {
  type: typeof SET_STORE_DATA;
  payload: TimerAppState;
}

export const setStoreData = (state: TimerAppState) => ({
  type: SET_STORE_DATA,
  payload: state,
});

export type SettingsAction = SetStoreDataAction;
