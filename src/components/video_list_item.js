import React from 'react';


const VideoListItem = ({video, onVideoSelect}) => {

  return (
    <li onClick={() => onVideoSelect(video)} className="list-group-item list">
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object img-size" src={video.cover_image} alt={video.song}/>
        </div>
        <div className="media-body">
          <div className="media-heading">
            {video.song}
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;