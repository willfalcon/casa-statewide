import React, { useEffect, useRef, useState } from 'react';
import { useMeasure } from 'react-use';
import styled from 'styled-components';
import Content from './content';

const AccordionSection = ({ slug, heading, content }) => {
  const [open, setOpen] = useState(false);
  const [ref, size] = useMeasure();

  return (
    <Section className="accordion-section" id={slug.current} contentHeight={size.height} open={open}>
      <h3 className="section__heading">
        <button id={`heading-${slug.current}`} aria-controls={`panel-${slug.current}`} aria-expanded={open} onClick={() => setOpen(!open)}>
          {heading}
        </button>
      </h3>
      <section
        className="section__panel"
        id={`panel-${slug.current}`}
        aria-labelledby={`heading-${slug.current}`}
        aria-hidden={!open}
        inert={!open}
      >
        <Content className="section__content" ref={ref}>
          {content}
        </Content>
      </section>
    </Section>
  );
};

const Section = styled.div`
  .section {
    &__heading {
      font-weight: ${({ theme }) => theme.font.medium};
      font-size: 2.8rem;
      border-bottom: 1px solid ${({ theme }) => theme.blue};
      padding-bottom: 1rem;
    }
    &__panel {
      overflow: hidden;
      height: ${({ open, contentHeight }) => (open ? `${contentHeight}px` : '0px')};
      transition: 0.25s;
      .block-content {
        padding-bottom: 1.6rem;
      }
    }
  }

  button {
    background: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    gap: 1rem;
    text-align: left;
    &::after {
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      flex: 0 0 20px;
      border-top: 3px solid ${({ theme }) => theme.blue};
      border-right: 3px solid ${({ theme }) => theme.blue};
      transform: rotate(45deg);
      transform: ${({ open }) => (open ? 'rotate(135deg)' : 'rotate(45deg)')};
      transition: 0.25s;
    }
  }
`;

export default AccordionSection;
