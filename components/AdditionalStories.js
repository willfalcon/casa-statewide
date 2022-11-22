import React from 'react';
import { useWindowSize } from 'react-use';
import StoriesListItem from './StoriesListItem';
import StoriesSlider from './StoriesSlider';

const AdditionalStories = ({ additionalPosts }) => {
  const { width } = useWindowSize();

  return width > 768 ? (
    additionalPosts.map(post => <StoriesListItem className="additional-posts-item" key={post._id} {...post} />)
  ) : (
    <StoriesSlider posts={additionalPosts} />
  );
};

export default AdditionalStories;
