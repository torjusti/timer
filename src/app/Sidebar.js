import React from 'react';
import styled from 'styled-components';
import SessionManager from 'sessions/SessionManager';
import Statistics from 'statistics/Statistics';
import SolversContainer from 'solvers/SolversContainer';
import theme from 'theme';

const SidebarContainer = styled.div`
  background: ${theme.sidebar};
  text-shadow: 0 1 0 #000;
  flex-grow: 1;
  min-height: 100%;
  padding: 1em;
  border-left: 1px solid ${theme.sidebarBorder};

  @media (min-width: 1200px) {
    width: 23%;
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
    <Statistics />

    <SidebarHeader>Manage sessions</SidebarHeader>
    <SessionManager />

    <SolversContainer />
  </SidebarContainer>
);

export default Sidebar;
