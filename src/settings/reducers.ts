import { Action } from 'reducers';
import * as actions from './actions';

export interface SettingsState {
  solutionsEnabled: boolean;
  inspectionEnabled: boolean;
}

const initialState: SettingsState = {
  solutionsEnabled: false,
  inspectionEnabled: true,
};

const settings = (state: SettingsState = initialState, action: Action): SettingsState => {
  switch (action.type) {
    case actions.SET_SOLUTIONS_ENABLED:
      return { ...state, solutionsEnabled: action.payload };

    case actions.SET_INSPECTION_ENABLED:
      return { ...state, inspectionEnabled: action.payload };

    default:
      return state;
  }
};

export default settings;
