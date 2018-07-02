import React from 'react';
import styled from 'styled-components';
import SolversContainer from 'solvers/SolversContainer';
import theme from 'theme';

const SidebarContainer = styled.div`
width: 100%;
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

    <SolversContainer />
  </SidebarContainer>
);

export default Sidebar;
