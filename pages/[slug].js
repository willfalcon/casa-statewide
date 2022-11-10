import React from 'react';
import Page from '../components/Page';

import Wrapper, { site } from '../components/Wrapper';
import client from '../lib/client';

const post = props => {
  return (
    <Wrapper site={props.site}>
      <Page {...props.page} />
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const data = await client.fetch(`
    *[_type == 'page'][] {
      _id,
      slug
    }
  `);
  return {
    paths: data.map(page => ({
      params: {
        id: page._id,
        slug: page.slug.current,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await client.fetch(
    `
    {
      ${site}
      "page": *[_type == "page" && slug.current == $slug][0]
    }
  `,
    { slug: context.params.slug }
  );

  return {
    props: {
      ...data,
    },
  };
}
export default post;
