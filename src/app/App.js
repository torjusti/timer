import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import Navigation from './Navigation';
import SessionsOverlay from 'sessions/SessionsOverlay';
import ViewTabs from './ViewTabs';

import RecordNotification from 'records/RecordNotification';
import Sidebar from './Sidebar';
import Results from 'results/Results'
import { colors } from 'theme';

const App = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default () => (
  <ThemeProvider theme={colors}>
    <App>
      <Header />
      <Navigation />
      <ViewTabs />

      <SessionsOverlay />
      <RecordNotification />
    </App>
  </ThemeProvider>
);
