import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import Stories from './Stories';
import SubNav from './SubNav';
import { media } from './theme';

const HomePage = props => {
  const { title, hero, bannerText, subNav, posts } = props;
  return (
    <StyledHome className="home-page">
      <Hero {...hero} />
      {bannerText && <h2 className="homepage-banner">{bannerText}</h2>}
      <SubNav subNav={subNav} />
      <Stories posts={posts} />
    </StyledHome>
  );
};

const StyledHome = styled.div`
  background: ${({ theme }) => theme.lighter};
  .homepage-banner {
    background: ${({ theme }) => theme.blue};
    color: white;
    margin: 0;
    text-align: center;
    font-size: 2.4rem;
    text-transform: uppercase;
    padding: 2.6rem 1rem;
    ${media.break`
      padding: 2.6rem 1rem 6rem;
      font-size: 5.8rem;
    `}
  }
`;
export default HomePage;
