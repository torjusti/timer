import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import Navigation from './Navigation';
import Scramble from 'scrambles/Scramble';
import SessionsOverlay from 'sessions/SessionsOverlay';

import TimerManager from 'timer/TimerManager';
import RecordNotification from 'records/RecordNotification';
import Sidebar from './Sidebar';
import Results from 'results/Results'
import { colors } from 'theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  text-align: center;
`;

export default () => (
  <ThemeProvider theme={colors}>
    <div>
      <Header />
      <Navigation />

      <Container>
        <Scramble />

        <TimerManager />

        <Sidebar />
      </Container>

      <SessionsOverlay />
      <RecordNotification />
    </div>
  </ThemeProvider>
);
