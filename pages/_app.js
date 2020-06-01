import React, { useEffect } from "react";
import Router from "next/router";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  useColorMode,
} from "@chakra-ui/core";
import { MDXProvider } from "@mdx-js/react";
import { Global, css } from "@emotion/core";
import { DefaultSeo } from "next-seo";

import MDXComponents from "../components/MDXComponents";
import SEO from "../next-seo.config";
import { prismLightTheme, prismDarkTheme } from "../styles/prism";
import theme from "../styles/theme";

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          ${colorMode === "light" ? prismLightTheme : prismDarkTheme};

          ::selection {
            background-color: #47a3f3;
            color: #fefefe;
          }

          html {
            min-width: 360px;
            height: -webkit-fill-available;
            scroll-behavior: smooth;
          }

          ::-webkit-scrollbar {
            height: 0px;
            width: 0px;
            background: transparent;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === "light" ? "#ffffff" : "#171923"};
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    let id = Router.asPath.match(/#([a-z0-9]+)/gi);
    if (id) {
      setTimeout(() => {
        Router.push(`${Router.route}/${id}`);
      }, 0);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={MDXComponents}>
        <ColorModeProvider value="light">
          <GlobalStyle>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </GlobalStyle>
        </ColorModeProvider>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default App;
