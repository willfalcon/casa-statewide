import React from 'react';
import styled from 'styled-components';
import ImageComp from './ImageComp';

const Gallery = ({ images }) => {
  return (
    <GalleryContainer className="gallery">
      {images.map(image => {
        return (
          <div className="gallery__image-wrapper">
            <ImageComp image={image} />
          </div>
        );
      })}
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div``;
export default Gallery;
