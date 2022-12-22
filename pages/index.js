import Wrapper, { site } from '../components/Wrapper';
import client from '../lib/client';
import HomePage from '../components/HomePage';

export default function Home(props) {
  return (
    <Wrapper site={props.site}>
      <HomePage {...props.page} subNav={props.site.subNav} />
    </Wrapper>
  );
}

export async function getStaticProps() {
  const data = await client.fetch(`{
    ${site}
    "page": *[_id == 'homePage'][0] {
      ...,
      hero {
        ...,
        button {
          ...,
          link-> { slug }
        } 
      },
      subscribeForm-> { ... },
      subNav[] {
        ...,
        link-> { slug }
      }
    }
  }`);

  return {
    props: data,
  };
}
