import React, { Suspense } from 'react';
import styled, { ThemeContext } from 'styled-components';
import dynamic from 'next/dynamic';

import Content from './Content';
import ImageComp from './ImageComp';
import { media } from './theme';

const SinglePost = ({ mainImage, title, subHeading, body, additionalPosts }) => {
  const AdditionalStories = dynamic(() => import('./AdditionalStories'), {
    ssr: false,
  });

  return (
    <StyledPost className="post">
      <div className="post-header">
        <div className="post-title-area">
          <h1 className="post-title">{title}</h1>
          <p className="post-subheading">{subHeading}</p>
        </div>
        <div className="post-image-wrapper">{mainImage && <ImageComp className="post-image" image={mainImage} />}</div>
      </div>

      <div className="post-main">
        <Content className="post-content">{body}</Content>

        <div className="additional-posts">
          <h2 className="additional-posts__heading text-center">Additional Stories</h2>
          <Suspense fallback={`...`}>
            <AdditionalStories additionalPosts={additionalPosts} />
          </Suspense>
        </div>
      </div>
    </StyledPost>
  );
};

const StyledPost = styled.div`
  .post-header {
    display: flex;
    flex-direction: column;
    grid-area: header;
    ${media.break`
      flex-direction: row;
    `}
  }

  .post-title-area {
    grid-area: title;
    background: ${({ theme }) => theme.red};
    color: white;
    text-align: center;
    padding: 2rem 1rem;
    order: 2;
    ${media.break`
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      order: 1;
      flex: 1 0 50%;
    `}
  }
  .post-image-wrapper {
    order: 1;
    ${media.break`
      order: 2;
    `}
  }
  .post-title {
    text-transform: uppercase;
    margin: 0;
  }
  .post-subheading {
    margin: 0;
  }

  .post-main {
    ${media.break`
      display: flex;
      padding: 2rem 4rem;
      justify-content: center;
    `}
  }
  .post-content {
    padding: 0 2rem;
    grid-area: content;
    h2 {
      text-transform: uppercase;
      color: ${({ theme }) => theme.blue};
    }
    ${media.break`
      flex: 0 1 ${({ theme }) => theme.sizes.content}px;
    `}
  }
  .additional-posts {
    flex: 1 1 400px;
    padding: 1rem 2rem;
    &__heading {
      text-transform: uppercase;
    }
    ${media.break`
      flex: 1 0 300px;
      max-width: 500px;
    `}
  }
`;
export default SinglePost;
