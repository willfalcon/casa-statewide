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
  const storiesPage = await client.fetch(`*[_type == "stories"][0] {
        categories[]-> { slug }
      }`);

  const { count, perPage } = await client.fetch(`
    {
      "count": count(*[_type == 'post']),
      "perPage": *[_id == "generalSettings"][0].postsPerPage
    }
  `);

  const numPages = Math.ceil(count / perPage);

  const paths = [...Array(numPages).keys()].map((_, i) => ({
    params: {
      page: `${i + 1}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const storiesPage = await client.fetch(`*[_type == "stories"][0] {
        categories[]-> { slug }
      }`);
  const { count, perPage } = await client.fetch(
    `
  {
    "count": count(*[_type == 'post' && count((categories[]->slug.current)[@ in $slugs]) > 0]),
    "perPage": *[_id == "generalSettings"][0].postsPerPage,
  }
`,
    { slugs: storiesPage.categories.map(category => category.slug.current) }
  );

  const page = parseInt(context.params.page);
  const start = (page - 1) * perPage;

  const end = start + perPage;
  const data = await client.fetch(
    `{
    ${site}
    "posts": *[_type == "post" && count((categories[]->slug.current)[@ in $slugs]) > 0] | order(publishedAt desc) [$start...$end] {
      title,
      subHeading,
      mainImage,
      slug,
      _id,
      excerpt
    }
  }`,
    { start, end, slugs: storiesPage.categories.map(category => category.slug.current) }
  );

  const numPages = Math.ceil(count / perPage);
  return {
    props: { ...data, page, numPages },
  };
}

export default stories;
