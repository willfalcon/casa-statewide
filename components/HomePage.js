import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import Hero from './Hero';
import ImageComp from './ImageComp';
import Stories from './Stories';
import SubNav from './SubNav';
import { media } from './theme';

import Form from './Form';

const HomePage = props => {
  const { title, hero, bannerText, subNav, posts, subscribeImage, subscribeForm } = props;
  return (
    <StyledHome className="home-page">
      <Hero {...hero} />
      {bannerText && <h2 className="homepage-banner">{bannerText}</h2>}
      <SubNav subNav={subNav} />
      <Stories posts={posts} />
      <div className="subscribe-form">
        <div className="subscribe-form__image-wrapper">
          <ImageComp className="subscribe-form__image" image={subscribeImage} useMobileCrop={true} />
        </div>
        <Form className="subscribe-form__form" {...subscribeForm} />
      </div>
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

  .subscribe-form {
    background: white;
    &__form {
      padding: 2rem;
      text-align: center;
    }
    ${media.break`
      display: flex;
      &__image-wrapper {
        order: 2;
        flex: 0 0 50%;
        img {
          height: 100%;
          object-fit: cover;
        }
      }
      &__form {
        order: 1;
        flex: 0 0 50%;
      }
    `}
  }
`;
export default HomePage;
