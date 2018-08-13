import React from 'react';
import SessionsOverlay from 'sessions/SessionsOverlay';
import ViewTabs from './ViewTabs';
import RecordNotification from 'records/RecordNotification';

const Home = () => (
  <div>
    <ViewTabs />
    <SessionsOverlay />
    <RecordNotification />
  </div>
);

export default Home;
