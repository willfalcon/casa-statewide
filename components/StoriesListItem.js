import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import ImageComp from './ImageComp';
import classNames from 'classnames';

const StoriesListItem = ({ slug, title, mainImage, subHeading, className }) => {
  return (
    <Post className={classNames(className, 'post')} href={`/story/${slug.current}`}>
      <h3 className="post__title">{title}</h3>
      <span className="post__sub-heading">{subHeading}</span>
      <span className="post__read-more read-more">
        Read Story <MdOutlineArrowRightAlt />
      </span>
      {mainImage && <ImageComp className="post__image" image={mainImage} />}
    </Post>
  );
};

const Post = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 40%;
  grid-template-rows: 1fr auto auto;
  grid-template-areas:
    'title image'
    'subheading image'
    'more image';
  padding: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.blue};
  margin-bottom: 2rem;
  column-gap: 1rem;
  background: white;
  &:hover {
    text-decoration: none;
  }
  .post {
    &__title {
      grid-area: title;
      margin: 0;
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
  }
`;
export default StoriesListItem;
