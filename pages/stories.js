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
  const { count, perPage } = await client.fetch(`
    {
      "count": count(*[_type == 'post']),
      "perPage": *[_id == "generalSettings"][0].postsPerPage
    }
  `);

  console.log(count, perPage);
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

  const numPages = Math.ceil(count / perPage);
  return {
    props: {
      ...data,
      page: 1,
      numPages,
    },
  };
}

export default stories;
