import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import NavToggle from './NavToggle';
import Nav from './Nav';
import Link from 'next/link';

const Header = ({ mainMenu, logo }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledHeader>
      <Link href="/" style={{ zIndex: 1, height: '100%', background: 'white' }}>
        <Image
          className="header-logo"
          src={logo.asset.url}
          alt="CASA: Court Appointed Special Advocates for Children"
          width={250}
          height={120}
        />
      </Link>
      <NavToggle className="header-nav-toggle" open={open} setOpen={setOpen} />
      <Nav open={open} nav={mainMenu} />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  .header-logo {
    z-index: 1;
    padding: 1rem 3rem;
    background: white;
  }
`;

export default Header;
