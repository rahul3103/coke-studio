import React from 'react';
import VideoListItem from './video_list_item'
import Navigation from './navigation'


const VideoList = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem 
        onVideoSelect={props.onVideoSelect}
        key={video.song} 
        video={video} />
    );
  }

    
  );

  return (
    <div>
      <ul className="col-md-4 list-group">
        {videoItems}
        <Navigation next={props.next}
          previous={props.previous}/>
      </ul>
    </div>
  );
};

export default VideoList;