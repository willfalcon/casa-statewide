import styled from 'styled-components';
import classNames from 'classnames';
import { urlFor } from '../lib/client';
import { media } from './theme';

const ImageComp = ({ className, image, alt, mobile, desktop, useMobileCrop = false }) => {
  if (!image) {
    return null;
  }
  const mobileSrc = mobile
    ? urlFor(useMobileCrop ? image : { ...image.asset })
        .width(mobile)
        .url()
    : urlFor(useMobileCrop ? image : { ...image.asset }).url();
  const desktopSrc = desktop ? urlFor(image).width(desktop).url() : urlFor(image).url();
  return (
    <>
      <MobileImg className={classNames('mobile', className)} src={mobileSrc} alt={alt} />
      <DesktopImg className={classNames('desktop', className)} src={desktopSrc} alt={alt} />
    </>
  );
};

const MobileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  ${media.break`
    display: none;
  `}
`;
const DesktopImg = styled.img`
  display: none;
  ${media.break`
    display: block;
    
    .page-content &.align-wide {
      width: ${({ theme }) => theme.sizes.wide}px;
      padding: 0 1rem;
    }
    .page-content &.align-full {
      width: 100%;
    }
  `}
`;

export default ImageComp;
