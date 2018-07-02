import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './app/App';
import SettingsContainer from './settings/SettingsContainer';
import AlgorithmsContainer from 'algorithms/AlgorithmsContainer';
import NotFound from 'app/NotFound';

export const routes = {
  home: '/',
  algorithms: '/algorithms',
  settings: '/settings',
};

const AppRouter = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path={routes.home} component={App} />
      <Route exact path={routes.algorithms} component={AlgorithmsContainer} />
      <Route exact path={routes.settings} component={SettingsContainer} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
