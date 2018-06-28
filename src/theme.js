import createTheme from 'styled-components-theme';

export const colors = {
  header: '#3875E0',
  sidebar: '#EFEFEF',
  sidebarBorder: '#E9E9E9',
};

const theme = createTheme(...Object.keys(colors));

export default theme;