import {AUDIO_PLAYER_STATE} from '../const';
import moment from 'moment'

const isMediaPresent = (audioPlayer) => {
  return audioPlayer && audioPlayer.playlist && audioPlayer.playlist.length > 0 && audioPlayer.mediaId
}

const isStateChangeAllowed = (oldAudioPlayer = {}, newAudioPlayer = {}) => {
  let {playerState:nextPlayerState} = newAudioPlayer;
  let {playerState:prevPlayerState} = oldAudioPlayer;
  if ((AUDIO_PLAYER_STATE.IS_STOPPED === nextPlayerState || AUDIO_PLAYER_STATE.IS_PAUSED === nextPlayerState) && AUDIO_PLAYER_STATE.IS_PLAYING === prevPlayerState) {
    // Can be stopped/paused only when already playing
    return true;
  }
  if (AUDIO_PLAYER_STATE.IS_PLAYING === nextPlayerState) {
    // Can be played: always
    return true;
  }
  return false;
}

const getMediaObject = (songs = [], base64String) =>  {
  return {
    mediaId: new Date().getTime(),
    title: 'Adv ' + new Date().toString(),
    playlist: songs.map((song) => {
      return {
        id: song.id || 'dummyId',
        name: 'Adv 1',
        src: song.src || '',
        base64String: base64String || ''
      }
    })
  }
}

const isNewMediaAvailable = (oldAudioPlayer, newAudioPlayer) => oldAudioPlayer && newAudioPlayer && newAudioPlayer.mediaId !== oldAudioPlayer.mediaId

const getSongIdInAudioPlayer = (audioPlayer, activeSongIndex) => audioPlayer.playlist[activeSongIndex] && audioPlayer.playlist[activeSongIndex].id

const getPlayerAction = (oldAudioPlayer, newAudioPlayer) => {
  if (!oldAudioPlayer || !newAudioPlayer) {
    return 'INVALID_ACTION';
  }
  if (oldAudioPlayer.playlist.length < 1 && newAudioPlayer.playlist.length > 0) {
    return 'NEW_MEDIA';
  }
  if (oldAudioPlayer.playlist.length > 0 && newAudioPlayer.playlist.length > 0 && isNewMediaAvailable(newAudioPlayer, oldAudioPlayer)) {
    return 'MEDIA_CHANGED';
  }
  if (AUDIO_PLAYER_STATE.IS_PAUSED === oldAudioPlayer.playerState && AUDIO_PLAYER_STATE.IS_PLAYING === newAudioPlayer.playerState) {
    return 'PLAYER_RESUMED'
  }
  if (AUDIO_PLAYER_STATE.IS_PLAYING === oldAudioPlayer.playerState && AUDIO_PLAYER_STATE.IS_PAUSED === newAudioPlayer.playerState) {
    return 'PLAYER_PAUSED';
  }
  if (AUDIO_PLAYER_STATE.IS_PLAYING === oldAudioPlayer.playerState && AUDIO_PLAYER_STATE.IS_STOPPED === newAudioPlayer.playerState) {
    return 'PLAYER_STOPPED';
  }
  return 'INVALID_ACTION'
}

const getHoursMinSecFromDuration = (durationInSec) => {
  let durationInMillis = moment.duration({seconds: durationInSec});
  return {
    hours: durationInMillis.hours(),
    minutes: durationInMillis.minutes(),
    seconds: durationInMillis.seconds()
  }
}

const formatDuration = (durationInSec) => {
  let {minutes, seconds} = getHoursMinSecFromDuration(durationInSec);
  if (seconds <= 9) {
    seconds = `0${seconds}`
  }
  return `${minutes}:${seconds}`
}

const getNextSongIndex = (currentPlaylist, activeSongIndex = -1) => {
  return currentPlaylist && currentPlaylist.length > 0 && currentPlaylist[activeSongIndex + 1] && (activeSongIndex + 1)
}

const getTotalDuration = async (playlist) => {
  let totalDuration = 0.0;
  let promise = new Promise((resolve, reject) => {
    playlist.map((media, index) => {
      let mediaDuration = 0.0;
      let audioInst = new Audio();
      audioInst.src = media.src;
      audioInst.onloadedmetadata = (a) => {
        totalDuration += audioInst.duration;
        if (playlist.length === index + 1) {
          resolve(totalDuration);
        }
      };
    })
  })
  return promise;
}

export {
  isMediaPresent,
  isStateChangeAllowed,
  getMediaObject,
  isNewMediaAvailable,
  getPlayerAction,
  getSongIdInAudioPlayer,
  formatDuration,
  getNextSongIndex,
  getTotalDuration
}
