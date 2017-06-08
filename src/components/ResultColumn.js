import React from 'react';
import ActiveResultList from '../containers/ActiveResultList';
import styled from 'styled-components';

const ResultColumnContainer = styled.div`
  flex-grow: 1;
  min-height: 100%;
  width: 100%;
  background: #EFEFEF;
  padding: 1em;

  @media (min-width: 1200px) {
    width: 20%;
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
