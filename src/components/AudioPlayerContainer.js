import {connect} from 'react-redux';
import {
  mapDispatchToAudioPlayerProps,
  mapStateToAudioPlayerProps
} from '../util/redux'

import AudioPlayer from './AudioPlayer'

const AudioPlayerContainer = connect(mapStateToAudioPlayerProps, mapDispatchToAudioPlayerProps)(AudioPlayer)

export default AudioPlayerContainer
