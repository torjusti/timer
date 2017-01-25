import React from 'react';
import styled from 'styled-components';
import ResultManager from '../containers/ResultManager';
import ScrambleManager from '../containers/ScrambleManager';
import Sidebar from './Sidebar';

const App = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default () => (
  <App>
    <ScrambleManager />
    <ResultManager />
    <Sidebar />
  </App>
);
