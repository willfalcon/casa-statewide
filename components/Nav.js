import React from 'react';
import styled from 'styled-components';
import { media } from './theme';
import NavItem from './NavItem';

const Nav = ({ open, nav }) => {
  return (
    <StyledNav className="nav" open={open}>
      <ul className="nav-menu">
        {nav.map(item => (
          <NavItem key={item._key} {...item} />
        ))}
      </ul>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  background: ${({ theme }) => theme.blue};
  position: absolute;
  top: 140px;
  width: 100%;
  left: 0;
  color: white;
  padding: 5rem 4rem;
  transition: 0.25s;
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-101%)')};
  z-index: 1;
  ${media.break`
    position: static;
    transform: none;
    display: flex;
    padding: 0;
    justify-content: space-around;
  `}
  ${media.wide`
    padding-right: 2rem;
  `}
  .nav-menu {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    ${media.break`
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-grow: 1;
      justify-content: space-around;
      justify-content: space-evenly;
    `}
  }
  .nav-item {
    font-size: 1.6rem;
    text-align: center;
    a,
    span {
      text-transform: uppercase;
      font-weight: ${({ theme }) => theme.font.medium};
      width: 100%;
      padding-top: 2rem;
      padding-bottom: 2rem;
      display: block;
      border-top: 0.5px solid white;
    }
    :last-child a {
      border-bottom: 0.5px solid white;
    }
    &.color {
      width: auto;
      margin: 1rem 0;
      a,
      span {
        border-top: 0;
      }
    }
    ${media.break`
      width: auto;
      a, span {
        border: 0;
      }
      margin: 0 1rem;
      :last-child a {
        border: 0;
      }
      &.color {
        margin: 0 1rem;
      }
    `}
  }
`;
export default Nav;
