import React from 'react';
import ScrambleDisplay from 'scrambles/ScrambleDisplay';
import TimerManager from 'timer/TimerManager';
import Solvers from 'solvers/Solvers';

const Home: React.FC = () => (
  <>
    <ScrambleDisplay />
    <TimerManager />
    <Solvers />
  </>
);

export default Home;
