import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import timerApp from './reducers';
import App from './components/App';
import './index.css';

const initialState = localStorage.state ? JSON.parse(localStorage.state) : undefined;

let store = createStore(timerApp, initialState);

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
