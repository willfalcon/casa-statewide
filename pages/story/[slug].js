import React from 'react';
import SinglePost from '../../components/SinglePost';
import Wrapper, { site } from '../../components/Wrapper';
import client from '../../lib/client';

const post = props => {
  return (
    <Wrapper site={props.site}>
      <SinglePost {...props.post} additionalPosts={props.additional} />
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const data = await client.fetch(`
    *[_type == 'post'][] {
      _id,
      slug
    }
  `);
  return {
    paths: data.map(post => ({
      params: {
        id: post._id,
        slug: post.slug.current,
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
      "post": *[_type == "post" && slug.current == $slug][0] {
        ...,
        content[] {
          ...,
          markDefs[] {
            ...,
            link-> { slug, _id }
          },
          link-> { slug, _id }
        }
      },
      "additional": *[_type == "post" && slug.current != $slug][0..3] {
        mainImage, title, subHeading, slug, _id
      }
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
