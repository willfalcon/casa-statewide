import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';
import Accordions from './Accordions';
import Button from './Button';
import GetInvolved from './GetInvolved';
import ImageComp from './ImageComp';
import InfoBlock from './InfoBlock';
import MediaText from './MediaText';

const Content = React.forwardRef(({ children, className }, ref) => {
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
        console.log(value);
        return <Accordions {...value} />;
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
