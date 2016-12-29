import React from 'react';
import ResultManager from '../containers/ResultManager';
import ActiveResultList from '../containers/ActiveResultList';
import SessionManager from '../containers/SessionManager';
import StatisticsContainer from '../containers/StatisticsContainer';
import ScrambleManager from '../containers/ScrambleManager';

const App = () => (
  <div className="App">
    <ScrambleManager />
    <ResultManager />
    <ActiveResultList />
    <SessionManager />
    <StatisticsContainer />
  </div>
);

export default App;
