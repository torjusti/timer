import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';
import App from './App';
import NotFound from './NotFound';
import Home from './Home';
import ResultList from 'results/Results';
import Statistics from 'statistics/Statistics';
import Settings from 'settings/Settings';

const AppRouter: React.FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.results} component={ResultList} />
        <Route exact path={routes.statistics} component={Statistics} />
        <Route exact path={routes.settings} component={Settings} />
        <Route path="*" component={NotFound} />
      </Switch>
    </App>
  </BrowserRouter>
);

export default AppRouter;
