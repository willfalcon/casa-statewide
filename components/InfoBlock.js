import React from 'react';
import styled from 'styled-components';
import Content from './content';
import ImageComp from './ImageComp';
import { media } from './theme';

const InfoBlock = ({ image, content }) => {
  return (
    <StyledInfoBlock className="info-block">
      <div className="info-block__image-wrapper">
        <ImageComp className="info-block__image" image={image} />
      </div>
      <Content className="info-block__content">{content}</Content>
    </StyledInfoBlock>
  );
};

const StyledInfoBlock = styled.div`
  margin: 4rem auto;
  ${media.break`
    width: ${({ theme }) => theme.sizes.wide}px;
    display: flex;
    gap: 2rem;
    .info-block {
      &__content {
        flex: 0 1 ${({ theme }) => theme.sizes.content}px;
      }
      &__image-wrapper {
        flex: 1 0 300px;
        max-width: 500px;
      }
    }
  `}
`;
export default InfoBlock;
