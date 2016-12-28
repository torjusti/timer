import React from 'react';
import ResultManager from '../containers/ResultManager';
import ActiveResultList from '../containers/ActiveResultList';
import SessionManager from '../containers/SessionManager';
import StatisticsContainer from '../containers/StatisticsContainer';

const App = () => (
  <div className="App">
    <ResultManager />
    <ActiveResultList />
    <SessionManager />
    <StatisticsContainer />
  </div>
);

export default App;
