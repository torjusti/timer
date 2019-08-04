import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { StylesProvider } from '@material-ui/styles';
import * as serviceWorker from './serviceWorker';
import AppRouter from 'app/AppRouter';
import store from './store';

const root = (
  <Provider store={store}>
    <StylesProvider injectFirst>
      <AppRouter />
      <ToastContainer />
    </StylesProvider>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));

serviceWorker.register();
