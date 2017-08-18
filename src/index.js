import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';
import App from './components/App';
import SettingsContainer from './containers/SettingsContainer';
import BigResultContainer from './containers/BigResultContainer';
import AlgorithmsContainer from './containers/AlgorithmsContainer';
import './globalStyles.js';

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/algorithms" component={AlgorithmsContainer} />
      <Route path="/settings" component={SettingsContainer} />
      <Route path="/result/:id" component={BigResultContainer} />
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
