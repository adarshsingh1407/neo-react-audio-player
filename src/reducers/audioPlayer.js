import {
  ADD_TO_PLAYLIST,
  CLEAR_PLAYLIST,
  PLAY_AUDIO,
  PAUSE_AUDIO,
  STOP_AUDIO,
  SET_PLAYER_VIEW,
  SET_TOTAL_DURATION,
  SET_ACTIVE_INDEX
} from '../actions/audioPlayer';
import {AUDIO_PLAYER_STATE} from '../const'

const AUDIO_PLAYER_DEFAULT_STATE = {
  mediaId: 0,
  title: '',
  playlist: [],
  activeIndex: -1,
  totalDuration: 0,
  currentDuration: 0,
  playerState: AUDIO_PLAYER_STATE.IS_STOPPED
};

const audioPlayer = (state = AUDIO_PLAYER_DEFAULT_STATE, action) => {
  var payload = action.payload;
  switch (action.type) {
    case ADD_TO_PLAYLIST:
      return {
        ...state,
        ...payload.media,
        playerState: AUDIO_PLAYER_STATE.IS_PLAYING
      };
    case CLEAR_PLAYLIST:
      return state;
    case PLAY_AUDIO:
      return {
        ...state,
        playerState: AUDIO_PLAYER_STATE.IS_PLAYING
      };
    case PAUSE_AUDIO:
    return {
      ...state,
      playerState: AUDIO_PLAYER_STATE.IS_PAUSED
    };
    case STOP_AUDIO:
    return {
      ...state,
      playerState: AUDIO_PLAYER_STATE.IS_STOPPED
    };
    case SET_PLAYER_VIEW:
      return {
        ...state,
        ...payload.playerView
      };
    case SET_TOTAL_DURATION:
      return {
        ...state,
        totalDuration: payload.totalDuration
      }
    case SET_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: payload.activeIndex
      }
    default:
      return state;
  }
}

export default audioPlayer
