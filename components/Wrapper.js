import React, { createContext, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Footer from './Footer';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import Meta from './Meta';
import theme, { media } from './theme';

export const site = `"site": {
"header": *[_id == 'generalSettings'][0] { 
    ..., 
    logo {
      ...,
      asset->{ ... }
    },
    mainMenu[] {
      ...,
      link->{ ... }
    },
  },
  "footer": *[_id == 'footerSettings'][0] {
    ...
  },
  "subNav": *[_id == 'homePage'][0].subNav[] {
    ...,
    link->{
      slug {
        current
      }
    }
  },
  "webFormAccessKey": *[_id == 'generalSettings'][0].webFormAccessKey
},`;

const SiteContext = createContext();
export const useSiteContext = () => useContext(SiteContext);

const Wrapper = ({ children, site }) => {
  const { subNav, webFormAccessKey, header, footer } = site;
  return (
    <ThemeProvider theme={theme}>
      <SiteContext.Provider value={{ ...header, subNav, webFormAccessKey }}>
        <SiteWrapper className="site-wrapper">
          <Meta />
          <Header {...header} />
          <PageWrapper className="page-wrapper">{children}</PageWrapper>
          <Footer {...footer} />
          <GlobalStyle />
        </SiteWrapper>
      </SiteContext.Provider>
    </ThemeProvider>
  );
};

const SiteWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
`;
const PageWrapper = styled.div`
  background: ${({ theme }) => theme.lighter};
  ${media.break`
    background: white;
    color: black;
  `}
`;

export default Wrapper;
