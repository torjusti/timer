import React from 'react';
import styled from 'styled-components';
import ResultManager from '../containers/ResultManager';
import ScrambleManager from '../containers/ScrambleManager';
import Sidebar from './Sidebar';

const App = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export default () => (
  <App>
    <ScrambleManager />
    <Container>
      <ResultManager />
      <Sidebar />
    </Container>
  </App>
);
