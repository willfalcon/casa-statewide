import React from 'react';
import client from '../lib/client';
import Wrapper, { site } from '../components/Wrapper';
import StoriesArchive from '../components/StoriesArchive';

const stories = props => {
  return (
    <Wrapper site={props.site}>
      <StoriesArchive posts={props.posts} page={props.page} numPages={props.numPages} />
    </Wrapper>
  );
};

export async function getStaticProps() {
  const perPage = 2;
  const start = 0;
  const end = start + perPage;
  const data = await client.fetch(
    `{
    ${site}
    "posts": *[_type == "post"][$start...$end] {
      title,
      subHeading,
      mainImage,
      slug,
      _id
    }
  }`,
    {
      start,
      end,
    }
  );
  const postCount = await client.fetch(`
  count(*[_type == 'post'])
`);
  const numPages = Math.ceil(postCount / perPage);
  return {
    props: {
      ...data,
      page: 1,
      numPages,
    },
  };
}

export default stories;
