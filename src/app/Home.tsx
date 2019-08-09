import React, { useRef } from 'react';
import styled from 'styled-components';
import ScrambleDisplay from 'scrambles/ScrambleDisplay';
import TimerManager from 'timer/TimerManager';
import Solvers from 'solvers/Solvers';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 800px) {
    user-select: none;
  }
`;

const Home: React.FC = () => {
  const homeContainer = useRef<HTMLDivElement>(null);

  return (
    <HomeContainer ref={homeContainer}>
      <ScrambleDisplay />
      
      <TimerManager
        touchContainer={homeContainer}
      />

      <Solvers />
    </HomeContainer>
  );
};

export default Home;
