import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Navigation from './Navigation';
import SessionsOverlay from 'sessions/SessionsOverlay';
import ViewTabs from './ViewTabs';
import RecordNotification from 'records/RecordNotification';

const App = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default () => (
  <App>
    <Header />
    <Navigation />
    <ViewTabs />

    <SessionsOverlay />
    <RecordNotification />
  </App>
);
