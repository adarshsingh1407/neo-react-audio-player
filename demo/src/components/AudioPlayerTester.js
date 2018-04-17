import React, {Component} from 'react'
import {Grid, Row, Col, Button, ProgressBar} from 'react-bootstrap'
import {AUDIO_PLAYER_STATE, SONGS} from '../../../src/const'
import {isMediaPresent, getMediaObject, isNewMediaAvailable, getSongIdInAudioPlayer, formatDuration} from '../../../src/util/audioPlayer'

const SongLabel = (props) => {
  return (<p><b>{props.song.name}</b> by <b>{props.song.artist}</b></p>)
}

class AudioPlayerTester extends Component {
  constructor(props){
    super(props);
    this.state = {
      tempPlaylist: []
    };
  }
  addToTempPLaylist = (song) => {
    this.setState({
      tempPlaylist: [...this.state.tempPlaylist, song]
    });
  }
  handlePlay = (song) => {
    let newMedia = getMediaObject([song]);
    const {audioPlayer: oldAudioPlayer} = this.props;
    const newAudioPlayer = {...oldAudioPlayer, ...newMedia};
    let oldSongId = getSongIdInAudioPlayer(oldAudioPlayer, 0);
    let newSongId = getSongIdInAudioPlayer(newAudioPlayer, 0);
    if (!oldSongId && newSongId) {
      // New song being played for the first time
      this.props.addToPlaylist(newMedia);
    } else if (oldSongId && newSongId && oldSongId === newSongId) {
      // Same song resumed from pause
      this.props.playAudio();
    } else {
      // A different song being played
      this.props.addToPlaylist(newMedia);
    }
  }
  handlePause = () => {
    this.props.pauseAudio();
  }
  handleStop = () => {
    this.props.stopAudio();
  }
  handlePlaylistPlay = () => {
    let newMedia = getMediaObject(this.state.tempPlaylist);
    const {audioPlayer: oldAudioPlayer} = this.props;
    const newAudioPlayer = {...oldAudioPlayer, ...newMedia};
    let oldSongId = getSongIdInAudioPlayer(oldAudioPlayer, 0);
    let newSongId = getSongIdInAudioPlayer(newAudioPlayer, 0);
    if (!oldSongId && newSongId) {
      // New song being played for the first time
      this.props.addToPlaylist(newMedia);
    } else if (oldSongId && newSongId && oldSongId === newSongId) {
      // Same song resumed from pause
      this.props.playAudio();
    } else {
      // A different song being played
      this.props.addToPlaylist(newMedia);
    }
  }
  handlePlaylistPause = () => {
    this.props.pauseAudio();
  }
  handlePlaylistStop = () => {
    this.props.stopAudio();
  }
  render(){
    const {audioPlayer} = this.props;
    console.log('TESTER', audioPlayer);
    if (!audioPlayer) {
      return (<div>Audio Player State/Store: Not Found</div>)
    }
    const {tempPlaylist} = this.state;
    const selectedSong = isMediaPresent(audioPlayer) && SONGS.find((song) => song.src === audioPlayer.playlist[0].src)
    const formattedMediaDuration = formatDuration(audioPlayer.totalDuration);
    const formattedCurrentDuration = formatDuration(audioPlayer.currentDuration);
    return(
      <div>
        <div align="center">
          <Row>
            <Col md={6}>
              {selectedSong && (<img style={{
                maxHeight: '150px'
              }} src={selectedSong.img} alt={selectedSong.name} />)}
            </Col>
            <Col md={6}>
              <p>
                <span>
                  Title: {selectedSong && (selectedSong.name || audioPlayer.media.title)}
                </span>
              </p>
              <p>No of Files: {audioPlayer.playlist.length}</p>
              <p>Length: {formattedMediaDuration}</p>
              <p>Current Duration: {formattedCurrentDuration}</p>
              <p>Player: {audioPlayer.playerState}</p>
              <ProgressBar min={0} max={audioPlayer.mediaDuration}
                bsStyle="info"
                now={audioPlayer.currentDuration} label={`${formattedCurrentDuration}`} />
            </Col>
          </Row>
        </div>
        <hr />
        {tempPlaylist && tempPlaylist.length > 0 && (<div align="center">
          <div>
            {tempPlaylist.map((tempSong, index) => {
              return (<div key={index}><SongLabel song={tempSong} /></div>)
            })}
          </div>
          <div>
            <Button type="button" bsStyle="info"
              // disabled={selectedSong && (selectedSong.id === song.id) && AUDIO_PLAYER_STATE.IS_PLAYING === audioPlayer.playerState}
              onClick={this.handlePlaylistPlay}>Play Playlist</Button>
            <Button type="button" bsStyle="warning"
              // disabled={!(selectedSong && (selectedSong.id === song.id) && AUDIO_PLAYER_STATE.IS_PLAYING === audioPlayer.playerState)}
              onClick={this.handlePlaylistPause}>Pause Playlist</Button>
            <Button type="button" bsStyle="danger"
              // disabled={!(selectedSong && (selectedSong.id === song.id) && AUDIO_PLAYER_STATE.IS_PLAYING === audioPlayer.playerState)}
              onClick={this.handlePlaylistStop}>Stop Playlist</Button>
          </div>
        </div>)}
        <hr />
        {SONGS.map((song) => {
          return (<div key={song.id}>
            <div align="center">
              <SongLabel song={song} />
              <Button type="button" bsStyle="info"
                disabled={selectedSong && (selectedSong.id === song.id) && AUDIO_PLAYER_STATE.IS_PLAYING === audioPlayer.playerState}
                onClick={() => this.handlePlay(song)}>Play</Button>
              <Button type="button" bsStyle="warning"
                disabled={!(selectedSong && (selectedSong.id === song.id) && AUDIO_PLAYER_STATE.IS_PLAYING === audioPlayer.playerState)}
                onClick={this.handlePause}>Pause</Button>
              <Button type="button" bsStyle="danger"
                disabled={!(selectedSong && (selectedSong.id === song.id) && AUDIO_PLAYER_STATE.IS_PLAYING === audioPlayer.playerState)}
                onClick={this.handleStop}>Stop</Button>
              <Button type="button" bsStyle="success"
                // disabled={!(selectedSong && (selectedSong.id === song.id) && AUDIO_PLAYER_STATE.IS_PLAYING === audioPlayer.playerState)}
                onClick={() => this.addToTempPLaylist(song)}>Add</Button>
            </div>
            <hr/>
          </div>)
        })}
      </div>
    );
  }
}

export default AudioPlayerTester
