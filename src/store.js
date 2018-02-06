import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import timerApp from './reducers';

const initialState = localStorage.state ? JSON.parse(localStorage.state) : undefined;

const store = createStore(
  timerApp,
  initialState,
  applyMiddleware(logger)
);

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;
