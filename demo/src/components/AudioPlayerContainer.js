import {connect} from 'react-redux';
import {
  mapDispatchToAudioPlayerProps,
  mapStateToAudioPlayerProps
} from '../../../src/util/redux'

import AudioPlayer from '../../../src/components/AudioPlayer'

const AudioPlayerContainer = connect(mapStateToAudioPlayerProps, mapDispatchToAudioPlayerProps)(AudioPlayer)

export default AudioPlayerContainer
