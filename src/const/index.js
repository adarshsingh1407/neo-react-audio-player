const PLAYER_REFRESH_RATE = 20000;

const AUDIO_PLAYER_STATE = {
  IS_STOPPED: 'IS_STOPPED',
  IS_PLAYING: 'IS_PLAYING',
  IS_PAUSED: 'IS_PAUSED'
}

const SONGS = [
  {
    "id": 1,
    "name": "Trains",
    "artist": "Porcupine Tree",
    "src": "http://a.tumblr.com/tumblr_m5e9tgdyhQ1qztmnoo1.mp3",
    "img": "https://i.ytimg.com/vi/0UHwkfhwjsk/hqdefault.jpg"
  }, {
    "id": 2,
    "name": "Free Bird",
    "artist": "Lynyrd Skynyrd",
    "src": "http://a.tumblr.com/tumblr_lw6t2emqrr1qe2vezo1_r1.mp3",
    "img": "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg"
  }, {
    "id": 3,
    "name": "No Reply",
    "artist": "The Beatles",
    "src": "http://storage.feems.com/music/Fab4ish/Beatles%20-%20No%20Reply%20.mp3",
    "img": "https://i.ytimg.com/vi/Q3dAeJUXbAA/maxresdefault.jpg"
  }, {
    "id": 4,
    "name": "Test",
    "artist": "Test",
    "src": "http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
    "img": ""
  }
]

export {
  PLAYER_REFRESH_RATE,
  AUDIO_PLAYER_STATE,
  SONGS
}
