import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';
import ImageComp from './ImageComp';
import { media } from './theme';
import { useSiteContext } from './Wrapper';

const PageTitle = ({ children }) => {
  const { pageTitleBackground } = useSiteContext();

  return (
    <StyledPageTitle className="page-title">
      <ImageComp className="page-title__background" image={pageTitleBackground} />
      <h1 className="page-title__title">{children}</h1>
    </StyledPageTitle>
  );
};

const StyledPageTitle = styled.div`
  position: relative;
  padding: 2rem;
  width: 100%;
  ${media.break`
  padding: 3rem 2rem;

  `}
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, ${rgba('#058FFB', 0.92)}, ${rgba('#003362', 0.93)});
    /* z-index: 1; */
  }
  .page-title {
    &__background {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
    &__title {
      position: relative;
      color: ${({ theme }) => theme.offWhite};
      text-align: center;
      text-transform: uppercase;
      font-weight: ${({ theme }) => theme.font.medium};
      font-size: 5rem;
      z-index: 1;
      margin: 0;
    }
  }
`;

export default PageTitle;
