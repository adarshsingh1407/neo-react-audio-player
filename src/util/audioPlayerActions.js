import {DEFAULT_TIMEOUT_BETWEEN_SWITCHING_TRACKS} from 'const/audioPlayerConst';

const ADD_NEW_TRACK = 'ADD_NEW_TRACK';
const SET_ELAPSED_TIME = 'SET_ELAPSED_TIME';
const PLAY_PLAYBACK = 'PLAY_PLAYBACK';
const PAUSE_PLAYBACK = 'PAUSE_PLAYBACK';
const STOP_PLAYBACK = 'STOP_PLAYBACK';
const CHANGE_MEDIA_SOURCE_INDEX = 'CHANGE_MEDIA_SOURCE_INDEX';

const addNewTrack = (newTrack = {}) => {
  return {
    type: ADD_NEW_TRACK,
    payload: {
      newTrack
    }
  }
}

const setElapsedTime = (elapsedTime = 0) => {
  return {
    type: SET_ELAPSED_TIME,
    payload: {
      elapsedTime
    }
  }
}

const playPlayback = () => {
  return {
    type: PLAY_PLAYBACK
  }
}

const pausePlayback = () => {
  return {
    type: PAUSE_PLAYBACK
  }
}

const stopPlayback = () => {
  return {
    type: STOP_PLAYBACK
  }
}

const changeMediaSourceIndex = (activeMediaSourceIndex = -1) => {
  return {
    type: CHANGE_MEDIA_SOURCE_INDEX,
    payload: {
      activeMediaSourceIndex
    }
  }
}

const stopAndPlayNewTrack = (newTrack = {}) => {
  return (dispatch) => {
    dispatch(stopPlayback());
    setTimeout(() => {
      dispatch(addNewTrack(newTrack));
    }, DEFAULT_TIMEOUT_BETWEEN_SWITCHING_TRACKS);
  }
}

export {
  ADD_NEW_TRACK,
  SET_ELAPSED_TIME,
  PLAY_PLAYBACK,
  PAUSE_PLAYBACK,
  STOP_PLAYBACK,
  CHANGE_MEDIA_SOURCE_INDEX,
  addNewTrack,
  setElapsedTime,
  playPlayback,
  pausePlayback,
  stopPlayback,
  changeMediaSourceIndex,
  stopAndPlayNewTrack
}
