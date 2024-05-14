import { parsePhoneNumber } from 'libphonenumber-js';
import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import { media } from './theme';
import Image from 'next/image';

const Footer = ({ address, email, links, message, phoneHeading, numbers, cornerLogo }) => {
  console.log(cornerLogo);
  return (
    <StyledFooter>
      {address && <Content className="footer-address">{address}</Content>}

      {email && (
        <div className="phone-email">
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      )}

      <div className="footer-phone-numbers">
        <h3>
          <strong>{phoneHeading}</strong>
        </h3>
        {numbers.map(number => {
          const parsedNumber = parsePhoneNumber(number, 'US');
          return (
            <a href={parsedNumber.getURI()} key={number}>
              {number}
            </a>
          );
        })}
      </div>

      <Content className="footer-message">{message}</Content>

      <div className="footer-links">
        {links.map(link => {
          const linkObj = new URL(link);
          return (
            <a href={linkObj.href} key={link}>
              {linkObj.host}
            </a>
          );
        })}
      </div>

      <div className="corner-logo">
        <a href={cornerLogo.link} target="_blank">
          <Image src={cornerLogo.logo.asset.url} alt={cornerLogo.alt} width={100} height={100} />
        </a>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.blue};
  color: white;
  font-weight: ${({ theme }) => theme.font.medium};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    'address message'
    'email links'
    'numbers . ';

  padding: 3rem 2rem;
  gap: 2rem;
  font-size: 1.8rem;

  ${media.break`
    padding: 7rem 10rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 3rem 5rem;
    grid-template-areas:
      "address message numbers"
      "address message logo"
      "email links logo";
  `}
  h1, h2, h3, h4, h5, h6 {
    color: white;
    margin-top: 0;
  }
  p {
    margin: 1rem 0;
  }
  a {
    color: ${({ theme }) => theme.light};
  }
  .footer-heading {
    word-break: normal;
    margin: 0;
    text-transform: uppercase;
  }
  .footer-address {
    font-style: normal;
    grid-area: address;
  }
  .footer-phone-numbers {
    grid-area: numbers;
    a {
      display: block;
    }
  }
  .footer-message {
    grid-area: message;
  }
  .footer-links {
    grid-area: links;
    word-break: break-all;
    a {
      display: block;
    }
  }
  .corner-logo {
    grid-area: logo;
    align-self: end;
  }
`;

export default Footer;
