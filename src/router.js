import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import SettingsContainer from './containers/SettingsContainer';
import BigResultContainer from './containers/BigResultContainer';
import AlgorithmsContainer from './containers/AlgorithmsContainer';

export const routes = {
  home: '/',
  algorithms: '/algorithms',
  settings: '/settings',
  result: '/result/:id',
};

const AppRouter = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path={routes.home} component={App} />
      <Route exact path={routes.algorithms} component={AlgorithmsContainer} />
      <Route exact path={routes.settings} component={SettingsContainer} />
      <Route exact path={routes.results} component={BigResultContainer} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;