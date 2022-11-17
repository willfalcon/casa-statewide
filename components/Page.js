import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import PageTitle from './PageTitle';

const Page = ({ title, content, references }) => {
  return (
    <StyledPage>
      <PageTitle>{title}</PageTitle>
      <Content className="page-content" references={references}>
        {content}
      </Content>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  .page-content > * {
    width: ${({ theme }) => theme.sizes.content}px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
  }
`;

export default Page;
