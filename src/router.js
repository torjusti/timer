import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './app/App';
import Home from './app/Home';
import SettingsContainer from './settings/SettingsContainer';
import AlgorithmsContainer from 'algorithms/AlgorithmsContainer';
import NotFound from 'app/NotFound';
import routes from './routes';

const AppRouter = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.algorithms} component={AlgorithmsContainer} />
        <Route exact path={routes.settings} component={SettingsContainer} />
        <Route path="*" component={NotFound} />
      </Switch>
    </App>
  </BrowserRouter>
);

export default AppRouter;
