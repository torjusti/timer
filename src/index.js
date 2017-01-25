import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import timerApp from './reducers';
import App from './components/App';
import ResultManagement from './components/ResultManagement';
import './globalStyles.js';

const initialState = localStorage.state ? JSON.parse(localStorage.state) : undefined;

let store = createStore(timerApp, initialState);

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="result/:id" component={ResultManagement} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
