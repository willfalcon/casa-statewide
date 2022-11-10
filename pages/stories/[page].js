import React from 'react';
import client from '../../lib/client';
import Wrapper, { site } from '../../components/Wrapper';
import StoriesArchive from '../../components/StoriesArchive';

const stories = props => {
  return (
    <Wrapper site={props.site}>
      <StoriesArchive posts={props.posts} page={props.page} numPages={props.numPages} />
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const data = await client.fetch(`
    count(*[_type == 'post'])
  `);
  const perPage = 2;
  const numPages = Math.ceil(data / perPage);

  const paths = [...Array(numPages).keys()].map((_, i) => ({
    params: {
      page: `${i + 1}`,
      numPages,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const perPage = 2;
  const page = parseInt(context.params.page);
  const start = (page - 1) * perPage;
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
    { start, end }
  );
  const postCount = await client.fetch(`
    count(*[_type == 'post'])
  `);
  const numPages = Math.ceil(postCount / perPage);
  return {
    props: { ...data, page, numPages },
  };
}

export default stories;
