import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import store from './store';
import App from './components/App';
import SettingsContainer from './containers/SettingsContainer';
import BigResultContainer from './containers/BigResultContainer';
import AlgorithmsContainer from './containers/AlgorithmsContainer';
import './globalStyles.js';

export const routes = {
  home: '/',
  algorithms: '/algorithms',
  settings: '/settings',
  result: '/result/:id',
};

const history = createBrowserHistory();

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path={routes.home} component={App} />
        <Route exact path={routes.algorithms} component={AlgorithmsContainer} />
        <Route exact path={routes.settings} component={SettingsContainer} />
        <Route exact path={routes.results} component={BigResultContainer} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root'),
);
