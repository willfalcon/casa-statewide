import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import Button from './Button';
import { rgba } from 'polished';
import { media } from './theme';
import ImageComp from './ImageComp';

const Hero = ({ button, image, text }) => {
  // console.log(image);
  return (
    <StyledHero className="hero">
      <ImageComp className="hero__image" image={image} alt={image.alt} />
      <div className="hero__content">
        <Content className="hero__text">{text}</Content>
        <Button className="hero__button" {...button} />
      </div>
    </StyledHero>
  );
};

const StyledHero = styled.div`
  position: relative;
  overflow: hidden;
  .hero {
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      ${media.break`
        position: relative;
      `}
    }
    &__content {
      position: relative;
      background: ${({ theme }) => rgba(theme.blue, 0.5)};
      color: white;
      margin-top: 50%;
      padding: 1rem 2.5rem;
      p {
        margin-top: 0;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      ${media.break`
        position: absolute;
        width: 100%;
        bottom: 0;
        font-weight: ${({ theme }) => theme.font.bold};
        font-size: 2.4rem;
        padding-bottom: 3rem;
      `}
    }
    &__text {
      text-align: center;
      *:last-child {
        margin-bottom: 0;
      }
      ${media.break`
        width: ${({ theme }) => theme.sizes.wide}px;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;

      `}
    }
    &__button {
      color: white;
      border-color: white;

      ${media.break`
        margin-top: 2rem;
      `}
      &:hover {
        background: white;
        color: ${({ theme }) => theme.blue};
      }
    }
  }
`;

export default Hero;
