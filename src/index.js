import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './router';
import './globalStyles.js';

const Root = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root'),
);
