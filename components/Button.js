import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Button = ({ text, className, label, link }) => {
  if (link) {
    const href =
      link._id === 'stories' || link._ref === 'stories'
        ? '/stories'
        : link._id === 'homePage' || link._ref === 'homePage'
        ? '/'
        : `/${link.slug?.current}`;
    return (
      <LinkButton href={href} className={classNames(className, 'button')}>
        {text || label}
      </LinkButton>
    );
  }
  return <StyledButton className={classNames(className, 'button')}>{text || label}</StyledButton>;
};

const LinkButton = styled(Link)``;

const StyledButton = styled.a`
  /* background: none;
  color: white; */
`;

export default Button;
