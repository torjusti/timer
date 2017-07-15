import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { Router, Route, browserHistory } from 'react-router';
import timerApp from './reducers';
import App from './components/App';
import SettingsContainer from './containers/SettingsContainer';
import BigResultContainer from './containers/BigResultContainer';
import './globalStyles.js';

const initialState = localStorage.state ? JSON.parse(localStorage.state) : undefined;

let store = createStore(
  timerApp,
  initialState,
  applyMiddleware(logger)
);

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/settings" component={SettingsContainer} />
      <Route path="/result/:id" component={BigResultContainer} />
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
