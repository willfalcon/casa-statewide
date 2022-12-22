import React from 'react';
import client from '../../lib/client';
import Wrapper, { site } from '../../components/Wrapper';
import StoriesArchive from '../../components/StoriesArchive';

const stories = props => {
  return (
    <Wrapper site={props.site}>
      <StoriesArchive posts={props.posts} page={1} numPages={props.numPages} title={props.category.title} category={props.category} />
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const categories = await client.fetch(`
    *[_type == 'category'] {
      slug
    }
  `);

  const paths = categories.map(category => {
    return {
      params: {
        slug: category.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;

  const { count, perPage } = await client.fetch(
    `
  {
    "count": count(*[_type == 'post' && $slug in categories[]->slug.current]),
    "perPage": *[_id == "generalSettings"][0].postsPerPage
  }
`,
    {
      slug,
    }
  );

  const start = 0;
  const end = start + perPage;
  const data = await client.fetch(
    `{
    ${site}
    "posts": *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) [$start...$end] {
      title,
      subHeading,
      mainImage,
      slug,
      _id,
      excerpt
    },
    "category": *[_type == "category" && slug.current == $slug][0] {
      title,
      description,
      slug,
    }
  }`,
    { slug, start, end }
  );

  const numPages = Math.ceil(count / perPage);
  return {
    props: { ...data, numPages },
  };
}

export default stories;
