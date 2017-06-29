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

const ScrollingTableContainer = styled.div`
  display: flex;
  height: 100%;
  overflow-y: scroll;
  position: relative;
`;

const ResultColumn = () => (
  <ResultColumnContainer>
    <ScrollingTableContainer>
      <ActiveResultList />
    </ScrollingTableContainer>
  </ResultColumnContainer>
);

export default ResultColumn;
