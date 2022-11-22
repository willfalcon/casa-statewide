import Wrapper, { site } from '../components/Wrapper';
import client from '../lib/client';
import HomePage from '../components/HomePage';

export default function Home(props) {
  return (
    <Wrapper site={props.site}>
      <HomePage {...props.page} posts={props.posts} />
    </Wrapper>
  );
}

export async function getStaticProps() {
  const data = await client.fetch(`{
    ${site}
    "page": *[_id == 'homePage'][0] {
      ...,
      subscribeForm-> { ... },
      subNav[] {
        ...,
        link-> { slug }
      }
    },
    "posts": *[_type == 'post'][0..2] {
      title, slug, subHeading, mainImage, _id
    }
  }`);

  return {
    props: data,
  };
}
