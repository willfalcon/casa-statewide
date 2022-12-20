import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import getYouTubeId from 'get-youtube-id';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const Video = ({ url }) => {
  if (!url) {
    return null;
  }
  const id = getYouTubeId(url);

  return (
    <div style={{ marginBottom: '30px' }}>
      <LiteYouTubeEmbed id={id} />
    </div>
  );
};

export default Video;
