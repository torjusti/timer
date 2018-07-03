import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';

import store from './store';
import AppRouter from './router';

import 'sanitize.css';

// We use Material UI for certain UI components. However, Material UI
// uses JSS, and we use styled-components. This forces JSS styles to insert
// before styled-components, so that we do not need to keep overriding styles.
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = document.getElementById('jss-insertion-point');

const Root = () => (
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <AppRouter />
    </JssProvider>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root'),
);

registerServiceWorker();
