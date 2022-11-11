import React from 'react';
import styled from 'styled-components';
import ImageComp from './ImageComp';
import theme, { media } from './theme';

const MediaText = ({ heading, color, image, text, alignment }) => {
  return (
    <StyledMediaText className="media-text" color={color} alignment={alignment}>
      <div className="media-text__image-wrapper">
        <ImageComp className="media-text__image" image={image} />
      </div>
      <div className="media-text__content">
        <h2 className="media-text__heading">{heading}</h2>
        <p className="media-text__text">{text}</p>
      </div>
    </StyledMediaText>
  );
};

const StyledMediaText = styled.div`
  background: ${({ color }) => color};
  color: white;

  .page-content > &.media-text {
    width: 100%;
    padding: 0;
  }

  ${media.break`
    display: flex;
    min-height: 300px;
  `}

  .media-text {
    &__content {
      flex: 0 0 50%;
      padding: 2rem 2rem;
      ${media.break`
        padding: 4rem 5rem;
        order: ${({ alignment }) => (alignment === 'img-left' ? 2 : 1)};
      `}
    }
    &__heading {
      color: white;
      text-transform: uppercase;
      margin: 0;
      ${media.break`
        font-size: 5rem;
      `}
    }
    &__text {
      margin: 0;
      ${media.break`
        font-size: 2rem;
      `}
    }
    &__image-wrapper {
      flex: 0 0 50%;
      position: relative;
      ${media.break`
        order: ${({ alignment }) => (alignment === 'img-left' ? 1 : 2)};
        `}
    }
    &__image {
      ${media.break`
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      `}
    }
  }
`;

export default MediaText;
