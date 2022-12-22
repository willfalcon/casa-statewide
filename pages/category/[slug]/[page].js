import React from 'react';
import client from '../../../lib/client';
import Wrapper, { site } from '../../../components/Wrapper';
import StoriesArchive from '../../../components/StoriesArchive';

const stories = props => {
  return (
    <Wrapper site={props.site}>
      <StoriesArchive
        posts={props.posts}
        page={props.page}
        numPages={props.numPages}
        title={props.category.title}
        category={props.category}
      />
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const { categories, perPage } = await client.fetch(`{
    "categories": *[_type == 'category'] {
      slug
    },
    "perPage": *[_id == "generalSettings"][0].postsPerPage,
  }`);

  const categoryArray = await Promise.all(
    categories.map(async category => {
      const count = await client.fetch(
        `
        count(*[_type == 'post' && $slug in categories[]->slug.current])
      `,
        { slug: category.slug.current }
      );
      const numPages = Math.ceil(count / perPage);

      return { ...category, numPages };
    })
  );

  const pathsArray = categoryArray.map(category => {
    return [...Array(category.numPages).keys()].map((_, i) => ({
      params: {
        slug: category.slug.current,
        page: `${i + 1}`,
      },
    }));
  });

  const paths = categories.map(category => {
    return {
      params: {
        slug: category.slug.current,
        page: '2',
      },
    };
  });

  return {
    paths: pathsArray.flat(),
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

  const page = parseInt(context.params.page);
  const start = (page - 1) * perPage;
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
      slug
    }
  }`,
    { slug, start, end }
  );

  const numPages = Math.ceil(count / perPage);
  return {
    props: { ...data, numPages, page },
  };
}

export default stories;
