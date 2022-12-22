import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { MdOutlineArrowRightAlt } from 'react-icons/md';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ImageComp from './ImageComp';
import { media } from './theme';
import Link from 'next/link';
import { useSiteContext } from './Wrapper';

const StoriesSlider = () => {
  const [tallest, setHeight] = useState(null);
  const { slider } = useSiteContext();
  return (
    <StyledStories className="stories" height={tallest}>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={true}
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
        {slider.map(post => {
          return (
            <SwiperSlide key={post._id}>
              <Post className="stories-post" href={`/story/${post.slug.current}`} height={tallest}>
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
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  display: flex;
  flex-direction: column;
  &:hover {
    text-decoration: none;
  }
  ${media.break`
    flex-direction: row;
    

    display: grid;
    grid-template-columns: auto 1fr;
  `}

  .stories-post {
    &-image-wrapper {
      ${media.break`
        flex-basis: 40%;
        flex-shrink: 1;
        /* width: 40%; */
        max-width: 32vw;
        height: ${({ height }) => (height ? `${height}px` : '100%')};
      `}
    }
    &-image {
      height: 200px;
      ${media.break`
        height: 100%;
        object-fit: cover;
      `}
    }
    &-content {
      background: white;
      padding: 1rem;
      flex-grow: 1;
      flex: 60%;
      ${media.break`
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 100%;
        gap: 2rem;
      `}
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
    margin: 2rem 0;
    ${media.break`
      margin: 4rem 0;
    `}
  }
  .stories-swiper {
    /* width: 80%; */
  }

  .stories-post {
    width: ${({ theme }) => theme.sizes.content}px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  --swiper-navigation-color: ${({ theme }) => theme.blue};
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
    ${media.break`
      display: flex;
    `}
  }

  .swiper-button-prev {
    left: calc((100vw - 900px) / 4);
  }
  .swiper-button-next {
    right: calc((100vw - 900px) / 4);
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

export default StoriesSlider;
