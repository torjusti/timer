import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import TimerManager from 'timer/TimerManager';
import ScrambleMenuContainer from 'scrambles/ScrambleMenuContainer';
import RecordNotification from 'records/RecordNotification';
import Sidebar from './Sidebar';
import Results from 'results/Results'
import { colors } from 'theme';

const App = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
`;

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;

  min-height: 100%;

  @media (min-width: 1200px) {
    width: 60%;
  }
`;

export default () => (
  <ThemeProvider theme={colors}>
    <App>
      <RecordNotification />
      <ScrambleMenuContainer />
      <Container>
        <Results />
        <Main>
          <TimerManager />
        </Main>
        <Sidebar />
      </Container>
    </App>
  </ThemeProvider>
);