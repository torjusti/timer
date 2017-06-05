import React from 'react';
import styled from 'styled-components';
import ResultManager from '../containers/ResultManager';
import ScrambleManager from '../containers/ScrambleManager';
import Sidebar from './Sidebar';
import ResultColumn from './ResultColumn'

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
      <ResultColumn />
      <ResultManager />
      <Sidebar />
    </Container>
  </App>
);
