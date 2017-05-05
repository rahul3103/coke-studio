import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {volume: 1}
    this.video = null;
    this.playButton = null;
    this.pbar = null;
    this.update = null;
    this.pbarContainer = null;
    this.timeField = null;
    this.soundButton = null;
    this.sbar = null;
    this.sbarContainer = null;
    this.fullscreenButton = null;
    this.screenButton = null;
    this.pauseScreen = null;
    this.playOrPause = this.playOrPause.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.skip = this.skip.bind(this);
    this.muteOrUnmute = this.muteOrUnmute.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.fullscreen = this.fullscreen.bind(this)
  }
  
componentDidMount() {
  this.video = this.refs.video;
  this.playButton = this.refs.playbutton;
  this.pbar = this.refs.pbar;
  this.pbarContainer = this.refs.pbarcontainer;
  this.timeField = this.refs.timefield;
  this.soundButton = this.refs.soundbutton;
  this.sbar = this.refs.sbar;
  this.sbarContainer = this.refs.sbarcontainer;
  this.fullscreenButton = this.refs.fullscreenbutton;
  this.screenButton = this.refs.screenbutton;
  this.pauseScreen = this.refs.screen;
}

componentDidUpdate() {
  this.video = this.refs.video;
  this.playButton = this.refs.playbutton;
  this.pbar = this.refs.pbar;
  this.pbarContainer = this.refs.pbarcontainer;
  this.timeField = this.refs.timefield;
  this.soundButton = this.refs.soundbutton;
  this.sbar = this.refs.sbar;
  this.sbarContainer = this.refs.sbarcontainer;
  this.fullscreenButton = this.refs.fullscreenbutton;
  this.screenButton = this.refs.screenbutton;
  this.pauseScreen = this.refs.screen;
  this.video.volume = this.state.volume;
  this.sbar.style.width = (this.state.volume)*100 + '%';
}
    
playOrPause() {
  if (this.video.paused) {
    this.video.play();
    this.playButton.src = 'images/pause.png';
    this.update = setInterval(this.updatePlayer, 30);
    this.pauseScreen.style.display = 'none';
    this.screenButton.src = 'images/replay.png'
  } else {
    this.video.pause();
    this.playButton.src = 'images/play.png';
    window.clearInterval(this.update);
    this.pauseScreen.style.display = 'block';
    this.screenButton.src = 'images/play.png'
  }

}

updatePlayer() {
  let percentage = (this.video.currentTime/this.video.duration)*100;
  this.pbar.style.width = percentage + '%';
  this.timeField.innerHTML = this.getFormattedTime();
  if (this.video.ended) {
    window.clearInterval(this.update);
    this.playButton.src = 'images/replay.png';
    this.pauseScreen.style.display = 'block';
    this.screenButton.src = 'images/replay.png'
  } else if (this.video.paused) {
    this.playButton.src = 'images/play.png';
    this.screenButton.src = 'images/play.png';
  }
}

skip(ev) {
    let mouseX = ev.pageX - this.pbarContainer.offsetLeft;
    let width = window.getComputedStyle(this.pbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length - 2));
    this.video.currentTime = (mouseX/width)*this.video.duration;
    this.updatePlayer();
}

getFormattedTime() {
  let seconds = Math.round(this.video.currentTime);
  let minutes = Math.floor(seconds/60);
  if (minutes > 0) seconds -= minutes*60;
  if (seconds.toString().length === 1) seconds = '0' + seconds;

  let totalSeconds = Math.round(this.video.duration);
  let totalMinutes = Math.floor(totalSeconds/60);
  if (totalMinutes > 0) totalSeconds -= totalMinutes*60;
  if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

  return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
}

muteOrUnmute() {
  if (!this.video.muted) {
    this.video.muted = true;
    this.soundButton.src = 'images/mute.png';
    this.sbar.style.display = 'none';
  } else {
    this.video.muted = false;
    this.soundButton.src = 'images/sound.png';
    this.sbar.style.display = 'block';
  }
}

changeVolume(ev) {
  let mouseX = ev.pageX - this.sbarContainer.offsetLeft;
  let width = window.getComputedStyle(this.sbarContainer).getPropertyValue('width');
  width = parseFloat(width.substr(0, width.length - 2));
  this.setState({volume: (mouseX/width)})
  this.video.volume = (mouseX/width);
  this.sbar.style.width = (mouseX/width)*100 + '%';
  this.video.muted = false;
  this.soundButton.src = 'images/sound.png';
  this.sbar.style.display = 'block';
}

fullscreen() {
  if (this.video.requestFullscreen) {
    this.video.requestFullscreen();
  } else if (this.video.webkitRequestFullscreen) {
    this.video.webkitRequestFullscreen();
  } else if (this.video.mozRequestFullscreen) {
    this.video.mozRequestFullscreen();
  } else if (this.video.msRequestFullscreen) {
    this.video.msRequestFullscreen();
  }
}

  render() {
    return (
      <div id="player">
          <div id="video-container">
            <div ref="screen" id="screen">
              <img ref="screenbutton" onClick={this.playOrPause} id="screen-button" src="images/play.png" alt="play"/>
            </div>
            <video ref="video" id="video" key={this.props.video.song} poster={this.props.video.cover_image} >
              <source src={this.props.video.url} type="audio/mpeg" />
            </video>
          </div>
          <div onClick={this.skip} ref="pbarcontainer" id="pbar-container">
            <div ref="pbar" id="pbar"></div>
          </div>
          <div id="buttons-container">
            <img ref="playbutton" id="play-button" onClick={this.playOrPause} src="images/play.png" alt="play"/>
            <div ref="timefield" id="time-field">
             0:00 / 0:00
            </div>
            <img onClick={this.muteOrUnmute} ref="soundbutton" id="sound-button" src="images/sound.png" alt="sound"/>
            <div onClick={this.changeVolume} ref="sbarcontainer" id="sbar-container">
              <div ref="sbar" id="sbar"></div>
            </div>
            <a href={this.props.video.url} download><img id="down-button" src="images/down.png" alt="down"/></a>
            <img onClick={this.fullscreen} ref="fullscreenbutton" id="fullscreen-button" src="images/fullscreen.png" alt="fullscreen"/>
          </div>
        </div>
    );

  }
}

export default Player;