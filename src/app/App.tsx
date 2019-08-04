import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = ({ children }) => (
  <AppContainer>
    <Header />
    {children}
  </AppContainer>
);

export default App;
