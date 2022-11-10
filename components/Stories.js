import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { MdOutlineArrowRightAlt } from 'react-icons/md';

import 'swiper/css';
import 'swiper/css/pagination';

import ImageComp from './ImageComp';
import { media } from './theme';
import Link from 'next/link';

const Stories = ({ posts }) => {
  const [tallest, setHeight] = useState(null);

  return (
    <StyledStories className="stories" height={tallest}>
      <h2 className="stories-heading">Stories</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="stories-swiper"
        onSwiper={swiper => {
          const slides = swiper.el.querySelectorAll('.stories-post');
          Array.from(slides).forEach(slide => {
            const { height } = slide.getBoundingClientRect();
            if (!height || height > tallest) {
              setHeight(height);
            }
          });
        }}
      >
        {posts.map(post => {
          return (
            <SwiperSlide key={post._id}>
              <Post className="stories-post" href={`/story/${post.slug.current}`}>
                <div className="stories-post-image-wrapper">
                  {post.mainImage && (
                    <ImageComp className="stories-post-image" image={post.mainImage} alt={post.mainImage.alt} mobile={300} useMobileCrop />
                  )}
                </div>
                <div className="stories-post-content">
                  <h3 className="stories-post-title">{post.title}</h3>
                  <p className="stories-post-excerpt">{post.subHeading}</p>
                  <span className="stories-post-read-more read-more">
                    Read Story <MdOutlineArrowRightAlt />
                  </span>
                </div>
              </Post>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </StyledStories>
  );
};

const Post = styled(Link)`
  display: block;
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    text-decoration: none;
  }
  ${media.break`
    flex-direction: row;
    height: auto;
  `}

  .stories-post {
    &-image-wrapper {
      ${media.break`
        flex: 40%;
        width: 40%;
      `}
    }
    &-image {
      height: 200px;
      ${media.break`
        height: auto;
      `}
    }
    &-content {
      background: white;
      padding: 1rem;
      flex-grow: 1;
      flex: 60%;
    }
    &-title {
      margin: 0;
      ${media.break`
        font-size: 4rem;
      `}
    }
    &-excerpt {
      color: ${({ theme }) => theme.blue};
      ${media.break`
        font-size: 2.4rem;
      `}
    }
    &-read-more {
    }
  }
`;
const StyledStories = styled.div`
  .stories-heading {
    color: ${({ theme }) => theme.blue};
    text-transform: uppercase;
    text-align: center;
  }
  .stories-swiper {
    width: 80%;
  }
  .swiper-wrapper {
    height: ${({ height }) => (height ? `${height}px` : 'auto')};
    ${media.break`
      height: auto;
    `}
  }
  .swiper-slide {
    height: 100%;
  }
  .swiper-pagination-bullets {
    position: static;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
  }
`;

export default Stories;
