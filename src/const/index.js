const AUDIO_PLAYER_STATE = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  STOPPED: 'STOPPED'
}

const PLAYER_INTERNAL_ACTION = {
  PLAY_NEW_MEDIA: 'PLAY_NEW_MEDIA',
  CONTINUE_PLAYING: 'CONTINUE_PLAYING',
  PAUSED: 'PAUSED',
  STOPPED: 'STOPPED'
}

const DEFAULT_TIMEOUT_BETWEEN_SWITCHING_TRACKS = 500;

export {
  AUDIO_PLAYER_STATE,
  PLAYER_INTERNAL_ACTION,
  DEFAULT_TIMEOUT_BETWEEN_SWITCHING_TRACKS
}
