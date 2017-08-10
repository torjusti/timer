import React from 'react';
import ActiveResultList from '../containers/ActiveResultList';
import styled from 'styled-components';
import theme from './theme';

const ResultColumnContainer = styled.div`
  flex-grow: 1;
  min-height: 100%;
  width: 100%;
  background: ${theme.sidebar};
  padding: 1em;
  border-right: 1px solid ${theme.sidebarBorder};

  @media (min-width: 1200px) {
    width: 23%;
  }
`;

const ResultColumn = () => (
  <ResultColumnContainer>
    <ActiveResultList />
  </ResultColumnContainer>
);

export default ResultColumn;
