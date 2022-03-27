import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1280px) {
      font-size: 93.75%;
    }

    @media (max-width: 768px) {
      font-size: 87.5%;
    }
  }

  body {
    background: ${({ theme }) => theme.colors.bodyColor};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body, input, textarea, select, button {
    font: ${({ theme }) => theme.fontWeight.regular} ${({ theme }) =>
  theme.fontSize.md} 'Poppins', sans-serif;
    color: ${({ theme }) => theme.colors.texts};
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
