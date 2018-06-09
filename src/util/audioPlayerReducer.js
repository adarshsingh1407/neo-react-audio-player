import {
  ADD_NEW_TRACK,
  SET_ELAPSED_TIME,
  PLAY_PLAYBACK,
  PAUSE_PLAYBACK,
  STOP_PLAYBACK
} from 'actions/audioPlayer/audioPlayerActions';
import {AUDIO_PLAYER_STATE} from 'const/audioPlayerConst';

const DEFAULT_TRACK = {
  currentId: undefined,
  currentName: '',
  totalDuration: 0,
  mediaSource: {}
}

const DEFAULT_ELAPSED_TIME = {
  elapsedTime: 0,
  remainingTime: 0
}

const DEFAULT_AUDIO_PLAYER_STATE = {
  ...DEFAULT_TRACK,
  playerState: AUDIO_PLAYER_STATE.STOPPED,
  ...DEFAULT_ELAPSED_TIME
}

const audioPlayerReducer = (state = DEFAULT_AUDIO_PLAYER_STATE, action) => {
  let {type: actionType, payload} = action;
  switch (actionType) {
    case ADD_NEW_TRACK:
      return {
        ...state,
        ...payload.newTrack,
        playerState: 'PLAYING'
      }
    case SET_ELAPSED_TIME:
    const elapsedTime = payload.elapsedTime;
      const remainingTime = state.totalDuration - elapsedTime;
      return {
        ...state,
        elapsedTime,
        remainingTime
      }
    case PLAY_PLAYBACK:
      return {
        ...state,
        playerState: AUDIO_PLAYER_STATE.PLAYING
      }
    case PAUSE_PLAYBACK:
      return {
        ...state,
        playerState: AUDIO_PLAYER_STATE.PAUSED
      }
    case STOP_PLAYBACK:
      return {
        ...DEFAULT_AUDIO_PLAYER_STATE
      }
    default:
      return state;
  }
}

export default audioPlayerReducer
