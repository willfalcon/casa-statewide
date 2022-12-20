import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';
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
    },
    types: {
      image: ({ value }) => {
        const align = value.size == 'wide' ? 'wide' : value.size == 'full' ? 'full' : 'normal';
        return <ImageComp className={classNames('content-image', 'align-' + align)} image={value} />;
      },
      mediaText: ({ value }) => {
        return <MediaText {...value} />;
      },
      button: ({ value }) => {
        const { alignment: justifyContent } = value;
        const button = value.link?._type === 'reference' ? { ...value, link: references.find(ref => ref._id === value.link._ref) } : value;

        return (
          <div className="content-button-wrapper" style={{ justifyContent }}>
            <Button className="content-button" {...button} />
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
