const getDuration = async (srcUrl = '') => {
  let promise = new Promise((resolve, reject) => {
    let audioInst = new Audio(srcUrl);
    audioInst.onloadedmetadata = (metaData) => {
      resolve(audioInst.duration);
    }
  });
  return promise;
}

const getHoursMinSecFromDuration = (durationInSec) => {
  let durationInMillis = moment.duration({
    seconds: durationInSec
  });
  return {
    hours: durationInMillis.hours(),
    minutes: durationInMillis.minutes(),
    seconds: durationInMillis.seconds()
  }
}

const getPaddedDuration = (duration) => {
  if (duration <= 9) {
    return `0${duration}`;
  } else {
    return duration;
  }
}

const formatDuration = (durationInSec = 0) => {
  durationInSec = Math.round(durationInSec);
  let {
    hours,
    minutes,
    seconds
  } = getHoursMinSecFromDuration(durationInSec);
  if (durationInSec < 3600) {
    return `${minutes}:${getPaddedDuration(seconds)}`
  } else {
    return `${hours}:${getPaddedDuration(minutes)}:${getPaddedDuration(seconds)}`
  }
}

const getPlayerAction = (prevProps, nextProps) => {
  let {
    audioPlayer: currentAudioPlayer
  } = prevProps;
  let {
    audioPlayer: nextAudioPlayer
  } = nextProps;
  if (currentAudioPlayer && nextAudioPlayer) {
    let {
      currentId: previousId,
      playerState: previousPlayerState
    } = currentAudioPlayer;
    let {
      currentId: nextId,
      playerState: nextPlayerState
    } = nextAudioPlayer;
    if (AUDIO_PLAYER_STATE.PLAYING === nextPlayerState && previousId !== nextId) {
      return PLAYER_INTERNAL_ACTION.PLAY_NEW_MEDIA;
    }
    if ((AUDIO_PLAYER_STATE.PAUSED === previousPlayerState || AUDIO_PLAYER_STATE.STOPPED === previousPlayerState) &&
      AUDIO_PLAYER_STATE.PLAYING === nextPlayerState && previousId === nextId) {
      return PLAYER_INTERNAL_ACTION.CONTINUE_PLAYING;
    }
    if (AUDIO_PLAYER_STATE.PLAYING === previousPlayerState && AUDIO_PLAYER_STATE.PAUSED === nextPlayerState) {
      return PLAYER_INTERNAL_ACTION.PAUSED;
    }
    if (AUDIO_PLAYER_STATE.PLAYING === previousPlayerState && AUDIO_PLAYER_STATE.STOPPED === nextPlayerState) {
      return PLAYER_INTERNAL_ACTION.STOPPED;
    }
  }
}

const getNewAudioInstance = (mediaSource, onPlay, onEnded) => {
  let newAudioInstance;
  if (mediaSource) {
    if (mediaSource.hasSrcUrl) {
      newAudioInstance = new Audio(mediaSource.srcUrl);
    } else {
      newAudioInstance = new Audio(mediaSource.base64);
    }
    newAudioInstance.onplay = onPlay;
    newAudioInstance.onended = onEnded;
  }
  return newAudioInstance;
}

export {
  getDuration,
  formatDuration,
  getPlayerAction,
  getNewAudioInstance
}