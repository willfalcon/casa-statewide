import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Accordions from './Accordions';
import Button from './Button';
import Form from './Form';
import Gallery from './Gallery';
import GetInvolved from './GetInvolved';
import ImageComp from './ImageComp';
import InfoBlock from './InfoBlock';
import MediaText from './MediaText';
import Video from './Video';

const Content = React.forwardRef(({ children, className, references }, ref) => {
  const components = {
    marks: {
      centered: props => <span className="text-center">{props.children}</span>,
      internalLink: props => {
        const { value, children } = props;

        const link = value.link;
        const href =
          link._id === 'stories' || link._ref === 'stories'
            ? '/stories'
            : link._id === 'homePage' || link._ref === 'homePage'
            ? '/'
            : `/${link.slug?.current}`;

        return <Link href={href}>{children}</Link>;
      },
    },
    types: {
      image: ({ value }) => {
        const align = value.size == 'wide' ? 'wide' : value.size == 'full' ? 'full' : 'normal';
        return <ImageComp className={classNames('content-image', 'align-' + align)} image={value} />;
      },
      mediaText: ({ value }) => {
        return <MediaText {...value} />;
      },
      button: props => {
        const { value } = props;

        const { alignment: justifyContent } = value;

        return (
          <div className="content-button-wrapper" style={{ justifyContent }}>
            <Button className="content-button" {...value} />
          </div>
        );
      },
      infoBlock: ({ value }) => {
        return <InfoBlock {...value} />;
      },
      getInvolved: ({ value }) => {
        return <GetInvolved {...value} />;
      },
      accordions: ({ value }) => {
        return <Accordions {...value} />;
      },
      form: ({ value }) => {
        const form = references.find(reference => reference._id === value._ref);
        return <Form {...form} />;
      },
      gallery: ({ value }) => {
        return <Gallery {...value} />;
      },
      youtube: ({ value }) => {
        return <Video {...value} />;
      },
    },
  };
  return (
    <StyledContent className={classNames(className, 'block-content')} ref={ref}>
      <PortableText value={children} components={components} />
    </StyledContent>
  );
});

const StyledContent = styled.div`
  .content-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem auto;
  }
  .content-image {
    margin-bottom: 2rem;
  }
`;

export default Content;
