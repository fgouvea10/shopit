import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1200px) {
      font-size: 93.75%;
    }

    @media (max-width: 768px) {
      font-size: 87.5%;
    }
  }

  body {
    background: ${({ theme }) => theme.colors.neutralColor100};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body, input, textarea, select, button {
    ${({ theme }) =>
      theme &&
      css`
        font: ${theme.fonts.regular} ${theme.fontSizes.md} 'Poppins', sans-serif;
        color: ${theme.colors.neutralColor900};
      `}
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    color: inherit;
    border: none;
  }
`;
