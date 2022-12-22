import React, { Suspense } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import PageTitle from './PageTitle';
import Pagination from './Pagination';
import StoriesListItem from './StoriesListItem';
import { useSiteContext } from './Wrapper';
const StoriesSlider = dynamic(() => import('./StoriesSlider'), {
  ssr: false,
});
const StoriesArchive = ({ posts, page, numPages, title, category }) => {
  const path = category ? `category/${category.slug.current}` : 'stories';

  return (
    <Archive className="archive">
      <PageTitle>{title || 'Stories'}</PageTitle>
      <Suspense fallback={`...`}>
        <StoriesSlider />
      </Suspense>
      <div className="archive-posts">
        {posts.map(post => (
          <StoriesListItem className="archive-post" key={post._id} {...post} />
        ))}
        <Pagination page={page} numPages={numPages} path={path} />
      </div>
    </Archive>
  );
};

const Archive = styled.div`
  .archive-posts {
    padding: 2rem;
    width: ${({ theme }) => theme.sizes.content}px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .post {
    &__title {
      font-size: 5rem;
    }
    &__sub-heading {
      font-size: 2rem;
      font-weight: ${({ theme }) => theme.font.medium};
      color: ${({ theme }) => theme.blue};
    }
  }
`;

export default StoriesArchive;
