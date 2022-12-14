import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = new sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2022-11-02',
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export { urlFor };
export default client;
