import React from 'react';
import { MdOutlineDirectionsBoatFilled } from 'react-icons/md';
import Page from '../components/Page';

import Wrapper, { site } from '../components/Wrapper';
import client from '../lib/client';

const post = props => {
  return (
    <Wrapper site={props.site}>
      <Page {...props.page} references={props.references} />
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

  const referenceFields = data.page.content?.filter(block => block.link?._type === 'reference' || block._type === 'form');
  const references = await Promise.all(
    referenceFields.map(async item => {
      try {
        if (item._type === 'form') {
          const form = await client.fetch(`*[_id == $ref][0]`, { ref: item._ref });
          return form;
        } else if (item.link?._type === 'reference') {
          const button = await client.fetch(`*[_id == $ref][0]`, { ref: item.link._ref });
          return button;
        }
      } catch (error) {
        return { ...item, error };
      }
    })
  );
  return {
    props: {
      ...data,
      references,
    },
  };
}
export default post;
