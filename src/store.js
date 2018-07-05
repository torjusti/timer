import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import timerApp from './reducers';
import rootSaga from './sagas';

const loadState = () => {
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

const saveState = data => {
  try {
    localStorage.setItem('state', JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

store.subscribe(() => {
  const state = store.getState();

  saveState({
    selectedSession: state.selectedSession,
    sessions: state.sessions,
    sets: state.sets,
  });
});

export default store;
