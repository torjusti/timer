import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import timerApp from './reducers';
import rootSaga from './sagas';

const initialState = localStorage.state
  ? JSON.parse(localStorage.state)
  : undefined;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  timerApp,
  initialState,
  applyMiddleware(logger, sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;
