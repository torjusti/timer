import React from 'react';
import styled from 'styled-components';
import ActiveResultList from '../containers/ActiveResultList';
import SessionManager from '../containers/SessionManager';
import StatisticsContainer from '../containers/StatisticsContainer';
import SolverContainer from '../containers/SolverContainer';
import ExportDataButton from '../containers/ExportDataButton';

const SidebarContainer = styled.div`;
  background: #EFEFEF;
  text-shadow: 0 1 0 #000;
  width: 100%;

  @media (min-width: 1200px) {
    width: 25%;
  }
`;

const Sidebar = () => (
  <SidebarContainer>
    <StatisticsContainer />
    <SessionManager />
    <ActiveResultList />
    <SolverContainer />
    <ExportDataButton />
  </SidebarContainer>
);

export default Sidebar;
