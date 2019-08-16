import { TimerAppState } from 'reducers';

export const SET_STORE_DATA = 'SET_STORE_DATA';
export const SET_SOLUTIONS_ENABLED = 'SET_SOLUTIONS_ENABLED';

export interface SetStoreDataAction {
  type: typeof SET_STORE_DATA;
  payload: TimerAppState;
}

export const setStoreData = (state: TimerAppState) => ({
  type: SET_STORE_DATA,
  payload: state,
});

export interface SetSolutionsEnabledAction {
  type: typeof SET_SOLUTIONS_ENABLED;
  payload: boolean;
}

export const setSolutionsEnabled = (enabled: boolean) => ({
  type: SET_SOLUTIONS_ENABLED,
  payload: enabled,
});

export type SettingsAction = SetStoreDataAction | SetSolutionsEnabledAction;
