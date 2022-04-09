import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import Header from 'components/Header';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/globals';
import theme from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const shouldNotContainerHeader = ['/sign-in'];

  return (
    <ThemeProvider theme={theme}>
      {!shouldNotContainerHeader.includes(router.pathname) && <Header />}
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
