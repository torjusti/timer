import React from 'react';
import styled from 'styled-components';
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
  border-left: 1px solid #E9E9E9;

  @media (min-width: 1200px) {
    width: 20%;
  }

  > h2:first-child {
    margin-top: 0;
  }
`;

export const SidebarHeader = styled.h2`
  margin: .5em 0 .5em 0;
  font-family: Roboto, sans-serif;
`;

const Sidebar = () => (
  <SidebarContainer>
    <SidebarHeader>Statistics</SidebarHeader>
    <StatisticsContainer />

    <SidebarHeader>Manage sessions</SidebarHeader>
    <SessionManager />

    <SolverContainer />

    <SidebarHeader>Export data</SidebarHeader>
    <ExportDataButton />
  </SidebarContainer>
);

export default Sidebar;
