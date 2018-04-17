const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';
const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'

const PLAY_AUDIO = 'PLAY_AUDIO';
const PAUSE_AUDIO = 'PAUSE_AUDIO';
const STOP_AUDIO = 'STOP_AUDIO';

const SET_PLAYER_VIEW = 'SET_PLAYER_VIEW';

const SET_TOTAL_DURATION = 'SET_TOTAL_DURATION';
const SET_ACTIVE_INDEX = 'SET_ACTIVE_INDEX';

const addToPlaylist = (media) => {
  return ({
    type: ADD_TO_PLAYLIST,
    payload: {
      media
    }
  })
}

const clearPlaylist = () => {
  return ({
    type: CLEAR_PLAYLIST
  })
}

const playAudio = () => {
  return ({
    type: PLAY_AUDIO
  })
}

const pauseAudio = () => {
  return ({
    type: PAUSE_AUDIO
  })
}

const stopAudio = () => {
  return ({
    type: STOP_AUDIO
  })
}

const setPlayerView = (playerView) => {
  return ({
    type: SET_PLAYER_VIEW,
    payload: {
      playerView
    }
  })
}

const setTotalDuration = (totalDuration) => {
  return ({
    type: SET_TOTAL_DURATION,
    payload: {
      totalDuration
    }
  })
}

const setActiveIndex = (activeIndex) => {
  return ({
    type: SET_ACTIVE_INDEX,
    payload: {
      activeIndex
    }
  })
}

export {
  ADD_TO_PLAYLIST,
  CLEAR_PLAYLIST,
  PLAY_AUDIO,
  PAUSE_AUDIO,
  STOP_AUDIO,
  SET_PLAYER_VIEW,
  SET_TOTAL_DURATION,
  SET_ACTIVE_INDEX,
  addToPlaylist,
  clearPlaylist,
  playAudio,
  pauseAudio,
  stopAudio,
  setPlayerView,
  setTotalDuration,
  setActiveIndex
}
