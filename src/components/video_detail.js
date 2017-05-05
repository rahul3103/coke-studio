import React from 'react';
import Player from './player'

const VideoDetail = ({video}) => {
  if (!video) {
    return <div>Loading</div>;
  }
  
  return (
    <div className="video-detail col-md-8">
      <div>
        <Player video={video}/>
      </div>
      <div className="nav-bar">
        <div className="details">
          <div>{video.song}</div>
          <div className="author">{video.artists}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;