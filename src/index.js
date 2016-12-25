import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import timerApp from './reducers';
import App from './components/App';

let store = createStore(timerApp);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
