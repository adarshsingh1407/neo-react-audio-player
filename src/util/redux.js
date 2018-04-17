import {
  addToPlaylist,
  clearPlaylist,
  playAudio,
  pauseAudio,
  stopAudio,
  setPlayerView,
  setTotalDuration,
  setActiveIndex
} from '../actions/audioPlayer'

const mapDispatchToAudioPlayerProps = dispatch => {
  return {
    addToPlaylist: (media) => dispatch(addToPlaylist(media)),
    clearPlaylist: () => dispatch(clearPlaylist()),
    playAudio: () => dispatch(playAudio()),
    pauseAudio: () => dispatch(pauseAudio()),
    stopAudio: () => dispatch(stopAudio()),
    setPlayerView: (playerView) => dispatch(setPlayerView(playerView)),
    setTotalDuration: (totalDuration) => dispatch(setTotalDuration(totalDuration)),
    setActiveIndex: (activeIndex) => dispatch(setActiveIndex(activeIndex))
  };
};

const mapStateToAudioPlayerProps = state => {
  return {
    audioPlayer: state.audioPlayer
  };
};

export {
  mapDispatchToAudioPlayerProps,
  mapStateToAudioPlayerProps
}
