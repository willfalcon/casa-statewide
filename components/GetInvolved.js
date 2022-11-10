import React from 'react';
import styled from 'styled-components';
import SubNav from './SubNav';
import { media } from './theme';
import { useSiteContext } from './Wrapper';

const GetInvolved = ({ heading }) => {
  const { subNav } = useSiteContext();

  return (
    <StyledGetInvolved className="get-involved">
      {heading && <h2 className="banner">{heading}</h2>}
      <SubNav subNav={subNav} />
    </StyledGetInvolved>
  );
};

const StyledGetInvolved = styled.div`
  .page-content &.get-involved {
    width: 100%;
    padding: 0;
  }
  .banner {
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
export default GetInvolved;
