import { injectGlobal } from 'styled-components';

import './assets/icons';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    height: 100%;
  }

  body {
    font-size: 1em;
    font-family: Open Sans, sans-serif;
  }
`;
