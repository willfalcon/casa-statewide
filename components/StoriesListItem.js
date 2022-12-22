import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import ImageComp from './ImageComp';
import classNames from 'classnames';

const StoriesListItem = ({ slug, title, mainImage, subHeading, className, excerpt }) => {
  return (
    <Post className={classNames(className, 'post')} href={`/story/${slug.current}`}>
      <h3 className="post__title">{title}</h3>
      <span className="post__sub-heading">{subHeading}</span>
      <p className="post__excerpt">{excerpt}</p>
      <span className="post__read-more read-more">
        Read Story <MdOutlineArrowRightAlt className="read-more-icon" />
      </span>
      {mainImage && <ImageComp className="post__image" image={mainImage} useMobileCrop />}
    </Post>
  );
};

const Post = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 40%;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    'title image'
    'subheading image'
    'excerpt image'
    'more image';
  padding: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.blue};
  margin-bottom: 2rem;
  column-gap: 1rem;
  background: white;
  .read-more-icon {
    transition: 0.15s;
  }
  &:hover {
    text-decoration: none;
    .read-more-icon {
      transform: translateX(30px);
    }
  }
  .post {
    &__title {
      grid-area: title;
      margin: 0;
      font-size: 2.4rem;
    }
    &__sub-heading {
      grid-area: subheading;
    }
    &__read-more {
      grid-area: more;
    }
    &__image {
      grid-area: image;
    }
    &__excerpt {
      grid-area: excerpt;
    }
  }
`;
export default StoriesListItem;
