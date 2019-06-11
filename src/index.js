import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import store from './store';
import AppRouter from './router';

import 'sanitize.css';

const Root = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));

registerServiceWorker();
