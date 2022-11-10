import React from 'react';
import styled from 'styled-components';
import ImageComp from './ImageComp';
import { media } from './theme';

const SubNav = ({ subNav }) => {
  return (
    <StyledSubNav className="subnav">
      {subNav.map(item => (
        <Item className="subnav-item" key={item._key} color={item.color}>
          {item.background && <ImageComp image={item.background} alt="" mobile={200} desktop={350} />}
          <span className="subnav-label">{item.label}</span>
        </Item>
      ))}
    </StyledSubNav>
  );
};

const Item = styled.a`
  display: block;
  flex: 1 1 33.33%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  ${media.break`
    flex: 0 0 300px;
    max-width: 33.33%;
    padding: 4.5rem;
  `}
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    z-index: 0;
    position: absolute;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    background: ${({ color }) => color};
    opacity: 75%;
    z-index: 1;
  }
  .subnav-label {
    z-index: 2;
    background: white;
    padding: 0rem 1rem;
    color: ${({ color }) => color};
    text-transform: uppercase;
    border-radius: 5px;
    ${media.break`
      font-weight: ${({ theme }) => theme.font.bold};
      font-size: 2.5rem;
      border-radius: 9px;
      padding: 0.2rem 2rem;
    `}
  }
`;

const StyledSubNav = styled.div`
  display: flex;
  ${media.break`
    width: 900px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -3rem;
  `}
`;

export default SubNav;
