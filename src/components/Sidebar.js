import React from 'react';
import styled from 'styled-components';
import ActiveResultList from '../containers/ActiveResultList';
import SessionManager from '../containers/SessionManager';
import StatisticsContainer from '../containers/StatisticsContainer';
import SolverContainer from '../containers/SolverContainer';
import ExportDataButton from '../containers/ExportDataButton';

const SidebarContainer = styled.div`
  background: #EFEFEF;
  text-shadow: 0 1 0 #000;
  flex-grow: 1;
  min-height: 100%;
  padding: 1em;

  @media (min-width: 1200px) {
    width: 20%;
  }
`;

export const SidebarHeader = styled.h2`
  margin: 0 0 1em 0;
`;

const Sidebar = () => (
  <SidebarContainer>
    <SidebarHeader>Statistics</SidebarHeader>
    <StatisticsContainer />

    <SidebarHeader>Manage sessions</SidebarHeader>
    <SessionManager />

    <SidebarHeader>EOLine Solutions</SidebarHeader>
    <SolverContainer />

    <SidebarHeader>Export data</SidebarHeader>
    <ExportDataButton />
  </SidebarContainer>
);

export default Sidebar;
