import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Navigation from './Navigation';

const App = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default ({ children }) => (
  <App>
    <Header />
    <Navigation />

    {children}
  </App>
);
