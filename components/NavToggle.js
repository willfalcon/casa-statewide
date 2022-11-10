import React from 'react';
import styled from 'styled-components';
import { media } from './theme';

const NavToggle = ({ open, setOpen, className }) => {
  return (
    <StyledToggle
      className={className}
      open={open}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <span />
      <span />
      <span />
    </StyledToggle>
  );
};

const StyledToggle = styled.button`
  flex-grow: 1;
  height: 140px;
  background: ${({ theme }) => theme.blue};
  position: relative;
  z-index: 1;
  border: 0;
  ${media.break`
    display: none;
  `}
  span {
    position: absolute;
    width: 30px;
    height: 3px;
    background: white;
    top: 50%;
    left: 50%;
    transition: 0.15s;
    &:nth-child(1) {
      transform: translate(-50%, -10px);
      transform: ${({ open }) => (open ? `translate(-50%, -1px) rotate(45deg)` : `translate(-50%, -10px) rotate(0deg)`)};
    }
    &:nth-child(2) {
      transform: translate(-50%, -1px);
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: translate(-50%, 8px);
      transform: ${({ open }) => (open ? `translate(-50%, -1px) rotate(-45deg)` : `translate(-50%, 8px) rotate(0deg)`)};
    }
  }
`;
export default NavToggle;
