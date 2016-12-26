import React from 'react';
import ResultManager from '../containers/ResultManager';
import ActiveResultList from '../containers/ActiveResultList';
import SessionManager from '../containers/SessionManager';

const App = () => (
  <div className="App">
    <ResultManager />
    <ActiveResultList />
    <SessionManager />
  </div>
);

export default App;
