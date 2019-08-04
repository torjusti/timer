import { createStore, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import timerApp, { TimerAppState } from './reducers';
import { createSession } from 'sessions/actions';
import rootSaga from './sagas';

const loadState = (): Partial<TimerAppState> | undefined => {
  try {
    return localStorage.state && JSON.parse(localStorage.state);
  } catch (error) {
    return undefined;
  }
};

const initialState = loadState();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  timerApp,
  initialState,
  applyMiddleware(logger, sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

if (!initialState) {
  store.dispatch(createSession('Default session'));
}

const saveState = (data: TimerAppState) => {
  try {
    localStorage.setItem('state', JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

// Save the store when it updates, but at most every 500 milliseconds.
store.subscribe(
  throttle(() => {
    const state = store.getState();

    saveState({
      selectedSession: state.selectedSession,
      sessions: state.sessions,
      solutions: state.solutions,
    });
  }, 500),
);

export default store;
