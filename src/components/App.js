import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import colors from './colors';
import ResultManager from 'containers/ResultManager';
import ScrambleManager from 'containers/ScrambleManager';
import PersonalBestContainer from 'containers/PersonalBestContainer';
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
      <PersonalBestContainer />
      <ScrambleManager />
      <Container>
        <ResultColumn />
        <Main>
          <ResultManager />
        </Main>
        <Sidebar />
      </Container>
    </App>
  </ThemeProvider>
);
