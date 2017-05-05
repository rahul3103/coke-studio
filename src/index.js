import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import config from './config';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


class App extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      videos: [],
      selectedVideo: null,
      term: null,
      searchedVideo: [],
      currentPage: 1,
      audioPerPage: 4,
      audioList: []
    };


    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.audioSearch = this.audioSearch.bind(this);

    let self = this;
    axios.get(config.CokeStudioAPI)
      .then( (response) => {
       self.setState({
        videos: response.data,
        selectedVideo: response.data[0],
        term: ''

      });

    });
  }

  next(e) {
    e.preventDefault();
    if (this.state.currentPage < 3 && this.state.searchedVideo.length > 1) {
      if (this.state.term && this.state.searchedVideo.length > 4) {
        this.setState({
          currentPage: (this.state.currentPage + 1)
        });
      }
    }
    else if (this.state.currentPage < 3 && this.state.searchedVideo.length === 0){
        this.setState({
          currentPage: (this.state.currentPage + 1)
        });
      }
  }

  previous(e) {
    e.preventDefault();
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: (this.state.currentPage - 1)
      });
    }
  }

  audioSearch(term) {
    this.setState({currentPage: 1});
    this.setState({term: term});
    if (term) {
      let filtercon = this.state.videos.filter(
          (video) => {
            return video.song.toLowerCase().indexOf(term.toLowerCase()) !== -1;
          }
        );
      if (filtercon) {
        this.setState({searchedVideo: filtercon});
      }
    }
    else {
      this.setState({searchedVideo: []});
    }
  }

  pagination(audios, currentPage, audioPerPage) {
    const indexOfLastAudio = currentPage * audioPerPage;
    const indexOfFirstAudio = indexOfLastAudio - audioPerPage;
    const currentAudios = audios.slice(indexOfFirstAudio, indexOfLastAudio);
    return currentAudios
  }


  render() {
    const { videos, currentPage, audioPerPage, searchedVideo } = this.state;
    let videolist = null;
    if (this.state.term) {
      videolist = this.pagination(searchedVideo, currentPage, audioPerPage)
    }
    else {
      videolist = this.pagination(videos, currentPage, audioPerPage)
    }

    return (
      <div>
        <div className="row">
          <div>
          <div className="content-row red">Coke</div>
          <div className="content-row">Studio</div>
          </div>
        </div>
        <SearchBar onSearch={term => this.audioSearch(term)}/>
        <VideoDetail video={this.state.selectedVideo  } />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={videolist}
          next={this.next}
          previous={this.previous} />
      </div>
    );
  }
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);
