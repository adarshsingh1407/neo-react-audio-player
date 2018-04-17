import React, {Component} from 'react'
import {PLAYER_REFRESH_RATE, AUDIO_PLAYER_STATE} from '../const';
import {
  isMediaPresent,
  isStateChangeAllowed,
  isNewMediaAvailable,
  getPlayerAction,
  getNextSongIndex,
  getTotalDuration
} from '../util/audioPlayer'

const STOP_AND_PLAY_ANOTHER = true;

const DEFAULT_PLAYER_STATE = {
  myAudioInstance: undefined
};

class AudioPlayer extends Component {
  constructor(props){
    super(props);
    this.state = DEFAULT_PLAYER_STATE;
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('SHOULD COMPONENT UPDATE', this.props, nextProps);
    let oldAudioPlayer = this.props.audioPlayer;
    let newAudioPlayer = nextProps.audioPlayer;
    let stateChangeAllowed = isStateChangeAllowed(oldAudioPlayer, newAudioPlayer);
    let newMediaAvailable = isNewMediaAvailable(oldAudioPlayer, newAudioPlayer);
    return oldAudioPlayer && newAudioPlayer && (newMediaAvailable || stateChangeAllowed);
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('COMPONENT WILL UPDATE', this.props, nextProps, this.state);
    let oldAudioPlayer = this.props.audioPlayer;
    let newAudioPlayer = nextProps.audioPlayer;
    let stateChangeAllowed = isStateChangeAllowed(oldAudioPlayer, newAudioPlayer);
    if (stateChangeAllowed) {
      this.handlePlayerStateChange(oldAudioPlayer, newAudioPlayer);
    }
  }
  handlePlayerStateChange = (oldAudioPlayer, newAudioPlayer) => {
    let action = getPlayerAction(oldAudioPlayer, newAudioPlayer)
    // console.log(action, oldAudioPlayer, newAudioPlayer);
    switch (action) {
      case 'NEW_MEDIA':
        this.uploadTotalDuration(newAudioPlayer.playlist);
        this.setupAudioPlayer(oldAudioPlayer, newAudioPlayer);
        break;
      case 'MEDIA_CHANGED':
        this.uploadTotalDuration(newAudioPlayer.playlist);
        this.stopMedia(STOP_AND_PLAY_ANOTHER, oldAudioPlayer, newAudioPlayer);
        break;
      case 'PLAYER_PAUSED':
        this.pauseMedia();
        break;
      case 'PLAYER_RESUMED':
        this.playMedia();
        break;
      case 'PLAYER_STOPPED':
        this.stopMedia();
        break;
      default:
        console.error('INVALID_ACTION');
    }
  }
  uploadTotalDuration = async (playlist) => {
    let totalDuration = await getTotalDuration(playlist);
    this.props.setTotalDuration(totalDuration);
    console.log('uploadTotalDuration', totalDuration);
  }
  setupAudioPlayer = (oldAudioPlayer, newAudioPlayer) => {
    let {activeSongIndex} = this.state;
    let currentPlaylist = newAudioPlayer.playlist;
    let nextSongIndex = getNextSongIndex(currentPlaylist, activeSongIndex);
    if (currentPlaylist && currentPlaylist.length > 0 && nextSongIndex >= 0) {
      this.setState({
        myAudioInstance: new Audio(),
        activeSongIndex: nextSongIndex
      }, () => {
        // console.log('SETUP AUDIO PLAYER', this.state);
        this.attachMediaToPlayerAndPlay(oldAudioPlayer, newAudioPlayer, nextSongIndex);
      });
    } else {
      // console.log('SETTING UP AUDIO PLAYER failed:', activeSongIndex, nextSongIndex, currentPlaylist);
    }
  }
  attachMediaToPlayerAndPlay = (oldAudioPlayer, newAudioPlayer, nextSongIndex) => {
    let {myAudioInstance:newAudioInstance} = this.state;
    let currentPlaylist = newAudioPlayer.playlist;
    newAudioInstance.src = currentPlaylist[nextSongIndex].src;
    newAudioInstance.onplay = () => this.onPlayMedia();
    newAudioInstance.onended = (a) => {
      // console.log('MEDIA PLAYBACK ENDED FOR activeSongIndex: ', this.state.activeSongIndex, a);
      this.stopMedia(STOP_AND_PLAY_ANOTHER, oldAudioPlayer, newAudioPlayer);
    };
    newAudioInstance.onstop = (a) => console.log('onstop', a);
    newAudioInstance.onloadedmetadata = (a) => this.onLoadedMetaData(a);
    this.setState({
      myAudioInstance: newAudioInstance
    }, () => this.playMedia());
  }
  stopMedia = (stopAndPlayAnother, oldAudioPlayer, newAudioPlayer) => {
    this.deactivatePlaybackTimer();
    if (this.state.myAudioInstance) {
      this.state.myAudioInstance.pause();
      let newAudioInstance = this.state.myAudioInstance;
      newAudioInstance.currentTime = 0.0;
      this.setState({
        myAudioInstance: undefined
      }, () => {
        this.setPlayerView(0.0, 0.0, AUDIO_PLAYER_STATE.IS_STOPPED)
        if (stopAndPlayAnother) {
          // Stop to Play Another
          this.setupAudioPlayer(oldAudioPlayer, newAudioPlayer);
        }
      });
    }
  }
  playMedia = () => {
    this.state.myAudioInstance.play();
    this.activatePlaybackTimer();
  }
  pauseMedia = () => {
    this.deactivatePlaybackTimer();
    if (this.state.myAudioInstance) {
      this.state.myAudioInstance.pause();
      this.setPlayerView(this.state.myAudioInstance.duration, this.state.myAudioInstance.currentTime, AUDIO_PLAYER_STATE.IS_PAUSED)
    }
  }
  activatePlaybackTimer = () => {
    var self = this;
    let timer = setInterval(() => {
      console.log('TIMELY STATE', self.state);
      this.setPlayerView(this.state.myAudioInstance.duration, this.state.myAudioInstance.currentTime, AUDIO_PLAYER_STATE.IS_PLAYING)
    }, PLAYER_REFRESH_RATE);
    self.setState({
      timer: timer
    });
  }
  deactivatePlaybackTimer() {
    this.state.timer && clearInterval(this.state.timer);
  }
  onPlayMedia = (a) => {
    // console.log('onPlayMedia', a);
  }
  onLoadedMetaData = (a) => {
    // console.log('onLoadedMetaData: Duration: ', this.state.myAudioInstance.duration);
    this.uploadMeta();
  }
  uploadMeta = () => {
    this.setPlayerView(this.state.myAudioInstance.duration, this.state.myAudioInstance.currentTime, AUDIO_PLAYER_STATE.IS_PLAYING)
  }
  setPlayerView = (mediaDuration, currentDuration, playerState) => {
    this.props.setPlayerView({
      mediaDuration,
      currentDuration,
      playerState
    })
  }
  render(){
    console.info('RENDER');
    return(
      <div align="center">
      </div>
    );
  }
}

export default AudioPlayer
