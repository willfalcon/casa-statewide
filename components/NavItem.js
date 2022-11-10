import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

const NavItem = ({ label, externalUrl, link, color }) => {
  if (link) {
    if (link._id === 'stories') {
      return (
        <li className={classNames('nav-item', { color })}>
          <Link className={classNames({ button: color })} style={{ background: color, color: 'white' }} href="/stories">
            {label}
          </Link>
        </li>
      );
    }
    return (
      <li className={classNames('nav-item', { color })}>
        <Link className={classNames({ button: color })} style={{ background: color, color: 'white' }} href={`/${link.slug.current}`}>
          {label}
        </Link>
      </li>
    );
  }
  return (
    <li className={classNames('nav-item', { color })}>
      {externalUrl ? (
        <a className={classNames({ button: color })} style={{ background: color, color: 'white' }} href={externalUrl}>
          {label}
        </a>
      ) : link?.slug || link?._id === 'stories' ? (
        <Link
          className={classNames({ button: color })}
          style={{ background: color, color: 'white' }}
          href={`/${link._id === 'stories' ? '/stories/' : link?.slug?.current || ''}`}
        >
          {label}
        </Link>
      ) : (
        <span className={classNames({ button: color })} style={{ background: color, color: 'white' }}>
          {label}
        </span>
      )}
    </li>
  );
};

export default NavItem;
